import React from "react";
import Discount from "./Discount";

const DiscountSection = ({ discountData }) => (
  <div className="w-full overflow-hidden">
    <h1 className="font-bold text-xl">Deals for you</h1>
    <div className="flex gap-4 mt-5">
      {discountData.map((data, i) => (
        <Discount data={data} key={i} />
      ))}
    </div>
  </div>
);

export default DiscountSection;
