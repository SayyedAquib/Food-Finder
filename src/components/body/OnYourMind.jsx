import { useState, useMemo, useEffect, useRef } from "react";
import { IMAGE_URL } from "../../utils/constants";

const OnYourMind = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(10);
  const containerRef = useRef(null);

  // Calculate items per view based on screen size
  useEffect(() => {
    const calculateItemsPerView = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setItemsPerView(2); // Mobile: 2 items
      } else if (width < 768) {
        setItemsPerView(3); // Small tablet: 3 items
      } else if (width < 1024) {
        setItemsPerView(4); // Tablet: 4 items
      } else if (width < 1280) {
        setItemsPerView(6); // Laptop: 6 items
      } else if (width < 1536) {
        setItemsPerView(8); // Desktop: 8 items
      } else {
        setItemsPerView(10); // Large desktop: 10 items
      }
    };

    // Calculate on mount
    calculateItemsPerView();

    // Add resize listener
    window.addEventListener("resize", calculateItemsPerView);

    // Cleanup
    return () => window.removeEventListener("resize", calculateItemsPerView);
  }, []);

  // Reset currentIndex when itemsPerView changes to prevent out-of-bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  // Calculate navigation boundaries
  const { maxIndex, canGoPrev, canGoNext } = useMemo(() => {
    const totalItems = data.length;
    const maxPossibleIndex = Math.max(0, totalItems - itemsPerView);

    return {
      maxIndex: maxPossibleIndex,
      canGoPrev: currentIndex > 0,
      canGoNext: currentIndex < maxPossibleIndex,
    };
  }, [data.length, currentIndex, itemsPerView]);

  const handleNext = () => {
    if (canGoNext) {
      // Move by itemsPerView or remaining items, whichever is smaller
      const remainingItems = maxIndex - currentIndex;
      const moveBy = Math.min(itemsPerView, remainingItems);
      setCurrentIndex((prev) => prev + moveBy);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      const moveBy = Math.min(itemsPerView, currentIndex);
      setCurrentIndex((prev) => prev - moveBy);
    }
  };

  // Calculate transform based on current index and item width
  const itemWidthPercentage = 100 / itemsPerView;
  const translateX = (currentIndex / itemsPerView) * 100;

  return (
    <>
      <div className="flex justify-between mt-5">
        <h1 className="font-bold text-xl md:text-2xl">What's on your mind?</h1>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`cursor-pointer rounded-full w-8 h-8 md:w-9 md:h-9 flex justify-center items-center transition-colors ${
              !canGoPrev
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <i
              className={`fi text-lg md:text-2xl mt-1 fi-rr-arrow-small-left ${
                !canGoPrev ? "text-gray-300" : "text-gray-800"
              }`}
            />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`cursor-pointer rounded-full w-8 h-8 md:w-9 md:h-9 flex justify-center items-center transition-colors ${
              !canGoNext
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <i
              className={`fi text-lg md:text-2xl mt-1 fi-rr-arrow-small-right ${
                !canGoNext ? "text-gray-300" : "text-gray-800"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="overflow-hidden mt-4" ref={containerRef}>
        <div
          style={{
            transform: `translateX(-${translateX}%)`,
          }}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {data.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-1 md:px-2"
              style={{ width: `${itemWidthPercentage}%` }}
            >
              <div className="cursor-pointer group">
                <img
                  className="w-full max-w-32 sm:max-w-36 md:max-w-40 mx-auto group-hover:scale-105 transition-transform duration-200"
                  src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                  alt={item?.action?.text || "Food category"}
                  fetchpriority="high"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border mt-4" />
    </>
  );
};

export default OnYourMind;
