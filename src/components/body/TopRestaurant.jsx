import { useRef, useState, useEffect } from "react";
import { RestaurantCard } from "../index";
import { useThrottle } from "../../hooks";

const TopRestaurant = ({ data = [], title }) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
  });

  const SCROLL_AMOUNT = 300;

  // ✅ Throttle scroll state
  const throttledScrollState = useThrottle(scrollState, 100);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollState({ scrollLeft, scrollWidth, clientWidth });
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
    const el = scrollRef.current;
    if (!el) return;

    // Run initially
    updateScrollState();

    // Listen for scroll and update raw state
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  // ✅ Use throttled scroll state for controlling buttons
  const { scrollLeft, scrollWidth, clientWidth } = throttledScrollState;
  const canScrollLeft = scrollLeft > 0;
  const canScrollRight = scrollLeft + clientWidth < scrollWidth - 5;

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
            style={{ minWidth: "150px" }}
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
