import React from "react";

const RestaurantHeader = ({ resInfo }) => (
  <div className="w-full h-[206px] bg-gradient-to-t px-4 pb-4 from-slate-200/70 mt-3 rounded-[30px]">
    <div className="w-full border border-slate-200/70 rounded-[30px] h-full bg-white p-4">
      <div className="flex items-center gap-1 font-semibold">
        <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
        <span>{resInfo.avgRating}</span>
        <span>({resInfo.totalRatingsString})</span>
        <span>{resInfo.costForTwoMessage}</span>
      </div>
      <p className="underline font-semibold text-orange-600">
        {resInfo?.cuisines?.join(", ")}
      </p>
      <OutletInfo locality={resInfo.locality} sla={resInfo.sla} />
    </div>
  </div>
);

const OutletInfo = ({ locality, sla }) => (
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

export default RestaurantHeader;
