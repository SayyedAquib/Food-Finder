import { useRef, useState, useEffect } from "react";

const HorizontalScroller = ({
  children,
  title,
  scrollAmount = 300,
  itemWidth = "auto",
  snap = false,
  gap = "gap-4",
}) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    left: 0,
    maxScroll: 0,
    width: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      setScrollState({
        left: el.scrollLeft,
        maxScroll: el.scrollWidth,
        width: el.clientWidth,
      });
    };

    handleScroll(); // Initial check

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      el?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const canScrollLeft = scrollState.left > 0;
  const canScrollRight =
    scrollState.left + scrollState.width < scrollState.maxScroll - 5;

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6 w-full">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`cursor-pointer rounded-full w-8 h-8 md:w-9 md:h-9 flex justify-center items-center transition-colors ${
                !canScrollLeft
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <i
                className={`fi text-lg md:text-2xl mt-1 fi-rr-arrow-small-left ${
                  !canScrollLeft ? "text-gray-300" : "text-gray-800"
                }`}
              />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`cursor-pointer rounded-full w-8 h-8 md:w-9 md:h-9 flex justify-center items-center transition-colors ${
                !canScrollRight
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <i
                className={`fi text-lg md:text-2xl mt-1 fi-rr-arrow-small-right ${
                  !canScrollRight ? "text-gray-300" : "text-gray-800"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className={`flex overflow-x-auto scroll-smooth ${gap} pb-2 pr-1 hide-scrollbar ${
          snap ? "scroll-snap-x scroll-snap-mandatory" : ""
        }`}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={`flex-shrink-0 ${snap ? "scroll-snap-start" : ""}`}
            style={{ minWidth: itemWidth }}
          >
            {child}
          </div>
        ))}
      </div>

      <hr className="border mt-6" />
    </div>
  );
};

export default HorizontalScroller;
