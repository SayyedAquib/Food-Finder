import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants";

const RestaurantCard = React.memo(
  ({
    link,
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    sla,
    locality,
    aggregatedDiscountInfoV3,
  }) => {
    const restaurantId = useMemo(() => link.split("/").at(-1), [link]);

    const imageSrc = useMemo(
      () => `${IMAGE_URL}fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`,
      [cloudinaryImageId]
    );

    const discountText = useMemo(
      () =>
        aggregatedDiscountInfoV3
          ? `${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader}`
          : "",
      [aggregatedDiscountInfoV3]
    );

    const cuisinesText = useMemo(() => cuisines.join(", "), [cuisines]);

    return (
      <Link to={`/restaurantMenu/${restaurantId}`}>
        <div className="min-w-[295px] h-[182px] relative">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src={imageSrc}
            alt={name}
          />
          <div className="bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0"></div>
          <p className="absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold">
            {discountText}
          </p>
        </div>
        <div className="mt-3">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="flex items-center gap-1 text-base font-semibold">
            <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
            {avgRating} <span className="mx-1">.</span>{" "}
            <span>{sla?.slaString}</span>
          </p>
          <p className="line-clamp-1 text-black/60 font-medium w-[295px]">
            {cuisinesText}
          </p>
          <p className="line-clamp-1 text-black/60 font-medium">{locality}</p>
        </div>
      </Link>
    );
  }
);

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;
