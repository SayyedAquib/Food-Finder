import { useState } from "react";
import { AddToCartBtn } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { toggleDiffRes } from "../utils/toogleSlice";
import { clearCart } from "../utils/cartSlice";
import { veg, nonVeg } from "../utils/links";

const DetailMenuCard = ({ info, resInfo }) => {
  const {
    name,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description = "",
    imageId,
  } = info;
  const isDiffRes = useSelector((state) => state.toogleSlice.isDiffRes);
  const dispatch = useDispatch();

  const handleIsDiffRes = () => dispatch(toggleDiffRes());
  const handleClearCart = () => {
    dispatch(clearCart());
    handleIsDiffRes();
  };

  const [isMore, setIsMore] = useState(false);
  const trimDes = description.substring(0, 138) + "...";

  return (
    <div className="relative w-full">
      <div className="flex w-full justify-between min-h-[182px]">
        <div className="w-[55%] md:w-[70%]">
          <img
            className="w-5 rounded-sm"
            src={itemAttribute?.vegClassifier === "VEG" ? veg : nonVeg}
            alt=""
          />
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="font-bold text-lg">
            ₹{defaultPrice / 100 || price / 100}
          </p>
          <div className="flex items-center gap-1">
            <i className="fi mt-1 text-xl fi-ss-star"></i>
            <span>
              {rating} ({ratingCountV2})
            </span>
          </div>
          {description.length > 140 ? (
            <div>
              <span className="line-clamp-2 md:line-clamp-none">
                {isMore ? description : trimDes}
              </span>
              <button
                className="hidden md:block font-bold"
                onClick={() => setIsMore(!isMore)}
              >
                {isMore ? "less" : "more"}
              </button>
            </div>
          ) : (
            <span>{description}</span>
          )}
        </div>
        <div className="w-[40%] md:w-[20%] relative h-full">
          <img
            className="rounded -xl aspect-square"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt=""
          />
          <AddToCartBtn
            info={info}
            resInfo={resInfo}
            handleIsDiffRes={handleIsDiffRes}
          />
        </div>
      </div>
      <hr className="my-5" />
      {isDiffRes && (
        <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
          <h1>Items already in cart</h1>
          <p>
            Your cart contains items from another restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex justify-between gap-3 w-full uppercase">
            <button
              onClick={handleIsDiffRes}
              className="border-2 w-1/2 p-3 border-green-600 text-green-600"
            >
              No
            </button>
            <button
              onClick={handleClearCart}
              className="w-1/2 p-3 bg-green-600 text-white"
            >
              Yes, start Afresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMenuCard;
