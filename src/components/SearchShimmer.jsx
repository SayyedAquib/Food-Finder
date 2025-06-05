const SearchShimmer = () => {
  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto animate-pulse px-2">
      {/* Search Bar */}
      <div className="w-full relative mb-6">
        <div className="border-2 w-full pl-8 py-3 text-xl bg-gray-200 rounded-md"></div>
      </div>

      {/* Filter Buttons */}
      <div className="my-7 flex flex-wrap gap-3">
        {["Restaurant", "Dishes"].map((_, i) => (
          <div key={i} className="w-32 h-10 bg-gray-200 rounded-md" />
        ))}
      </div>

      {/* Grid Shimmer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f4f5f7] p-4 rounded-md">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-start"
          >
            <div className="w-20 h-20 bg-gray-300 rounded-md flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-grow">
              <div className="w-3/4 h-4 bg-gray-300 rounded" />
              <div className="w-1/2 h-4 bg-gray-300 rounded" />
              <div className="w-full h-3 bg-gray-200 rounded" />
              <div className="w-2/3 h-3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchShimmer;
