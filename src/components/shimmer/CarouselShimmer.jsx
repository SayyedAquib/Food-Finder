const CarouselShimmer = () => {
  const shimmerItems = new Array(6).fill(0);

  return (
    <section className="my-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

      <div className="flex gap-4 overflow-x-auto">
        {shimmerItems.map((_, index) => (
          <div
            key={index}
            className="min-w-[100px] h-[100px] bg-gray-300 dark:bg-gray-700 rounded-lg"
          ></div>
        ))}
      </div>
    </section>
  );
};

export default CarouselShimmer;
