const CartShimmer = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="w-[95%] md:w-[800px] mx-auto">
        {/* Restaurant Info Placeholder */}
        <div className="my-10 flex gap-5">
          <div className="rounded-xl w-40 h-40 bg-gray-300"></div>
          <div className="flex flex-col gap-3 w-full">
            <div className="h-8 bg-gray-300 rounded w-[60%]"></div>
            <div className="h-4 bg-gray-300 rounded w-[40%]"></div>
          </div>
        </div>

        <hr className="my-5 border-2" />

        {/* Cart Items Placeholder (loop 2–3 for demo) */}
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex w-full my-5 justify-between min-h-[182px]"
          >
            <div className="w-[55%] md:w-[70%] flex flex-col gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded-sm" />
              <div className="h-5 bg-gray-300 rounded w-2/3" />
              <div className="h-5 bg-gray-300 rounded w-1/3" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </div>
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-[80%]" />
            </div>

            <div className="w-[40%] md:w-[20%] relative h-full">
              <div className="rounded-xl aspect-square bg-gray-300" />
              <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-gray-300 w-24 h-8 rounded-xl" />
            </div>
          </div>
        ))}

        {/* Total and Buttons */}
        <div className="h-6 bg-gray-300 w-1/3 rounded mt-8" />
        <div className="flex justify-between gap-4 mt-7">
          <div className="h-10 w-1/4 bg-gray-300 rounded-lg" />
          <div className="h-10 w-1/4 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CartShimmer;
