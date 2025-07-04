import React, { useMemo } from "react";
import { ImageCard, RatingDisplay, LinkWrapper } from "../index";

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

    const discountText = useMemo(
      () =>
        aggregatedDiscountInfoV3
          ? `${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader}`
          : "",
      [aggregatedDiscountInfoV3]
    );

    const cuisinesText = useMemo(() => cuisines.join(", "), [cuisines]);

    const DiscountOverlay = () => (
      <>
        <div className="bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0"></div>
        <p className="absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold">
          {discountText}
        </p>
      </>
    );

    const RestaurantInfo = () => (
      <div className="mt-3">
        <h2 className="text-lg font-semibold">{name}</h2>
        <RatingDisplay
          rating={avgRating}
          additionalInfo={sla?.slaString}
          iconClass="fi fi-ss-circle-star mt-1"
          className="text-base font-semibold"
        />
        <p className="line-clamp-1 text-black/60 font-medium w-[295px]">
          {cuisinesText}
        </p>
        <p className="line-clamp-1 text-black/60 font-medium">{locality}</p>
      </div>
    );

    return (
      <LinkWrapper
        to={`/restaurantMenu/${restaurantId}`}
        aria-label={`View details for ${name}`}
      >
        <div>
          <ImageCard
            imageId={cloudinaryImageId}
            alt={name}
            className="min-w-[295px] h-[182px]"
            width={660}
            height={400}
            aspectRatio=""
            overlayContent={<DiscountOverlay />}
          />
          <RestaurantInfo />
        </div>
      </LinkWrapper>
    );
  }
);

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;
