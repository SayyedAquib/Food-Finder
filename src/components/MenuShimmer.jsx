const MenuShimmer = () => {
  console.log("MenuShimmer rendered");
  return (
    <div className="w-full lg:w-[50%] mx-auto mt-10">
      <div className="w-full h-40 sm:h-80 rounded-xl animate"></div>
      <div className="w-full flex mt-10 justify-between">
        <div className="w-[45%] h-10 rounded-xl animate"></div>
        <div className="w-[45%] h-10 rounded-xl animate"></div>
      </div>

      <div className="w-full mt-20 flex flex-col gap-9">
        {Array(5)
          .fill("")
          .map((data, i) => (
            <div key={i} className="w-full h-40 flex justify-between">
              <div className="w-[60%] flex flex-col gap-5 h-full">
                <div className="w-[100%] h-5 animate"></div>
                <div className="w-[50%] h-5 animate"></div>
                <div className="w-[30%] h-5 animate"></div>
              </div>
              <div className="w-[30%] rounded-xl h-full animate"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
