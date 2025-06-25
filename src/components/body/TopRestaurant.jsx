import { useRef, useState, useEffect } from "react";
import { RestaurantCard } from "../index";

function throttle(fn, wait) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn(...args);
    }
  };
}

const TopRestaurant = ({ data = [], title }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll amount in pixels (adjust as needed)
  const SCROLL_AMOUNT = 300;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const left = scrollLeft > 0;
    const right = scrollLeft + clientWidth < scrollWidth - 5;
    setCanScrollLeft((prev) => (prev !== left ? left : prev));
    setCanScrollRight((prev) => (prev !== right ? right : prev));
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll(); // Initialize scroll states
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Throttle the scroll handler to run at most every 100ms
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const throttledScroll = throttle(handleScroll, 100);
    el.addEventListener("scroll", throttledScroll);
    // Call once to initialize
    throttledScroll();
    return () => el.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <div className="mt-14 w-full">
      <div className="flex justify-between items-center mt-5">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex gap-3">
          <div
            onClick={handlePrev}
            className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ${
              canScrollLeft ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            <i
              className={`fi text-2xl mt-1 fi-rr-arrow-small-left ${
                canScrollLeft ? "text-gray-800" : "text-gray-300"
              }`}
            ></i>
          </div>
          <div
            onClick={handleNext}
            className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ${
              canScrollRight ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            <i
              className={`fi text-2xl mt-1 fi-rr-arrow-small-right ${
                canScrollRight ? "text-gray-800" : "text-gray-300"
              }`}
            ></i>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth gap-5 mt-4 pb-2 pr-1 hide-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {data.map(({ info, cta: { link } }) => (
          <div
            key={info.id}
            className="flex-shrink-0 hover:scale-95 duration-300 scroll-snap-start"
            style={{ minWidth: "150px" }} // adjust based on your card size
          >
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>

      <hr className="border mt-10" />
    </div>
  );
};

export default TopRestaurant;
