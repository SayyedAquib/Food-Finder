const OutletInfo = ({ locality, sla }) => {
  return (
    <div className="flex gap-2 mt-2">
      <div className="w-[9px] flex flex-col justify-center items-center">
        <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
        <div className="w-[1px] h-[25px] bg-gray-500"></div>
        <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
      </div>
      <div className="flex flex-col gap-1 text-sm font-semibold">
        <p>
          Outlet <span className="text-gray-500 font-normal">{locality}</span>
        </p>
        <p>{sla?.slaString}</p>
      </div>
    </div>
  );
};

export default OutletInfo;
