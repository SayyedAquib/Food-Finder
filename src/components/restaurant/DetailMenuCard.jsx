import { useCallback, useState } from "react";
import { AddToCartBtn, CartConflictModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsDifferentRestaurant } from "../../redux/slices/toggleSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { VEG, NON_VEG, IMAGE_URL } from "../../utils/constants";

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

  const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);
  const dispatch = useDispatch();

  const handleIsDiffRes = useCallback(() => {
    dispatch(toggleIsDifferentRestaurant());
  }, [dispatch]);

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
            src={itemAttribute?.vegClassifier === "VEG" ? VEG : NON_VEG}
            alt={
              itemAttribute?.vegClassifier === "VEG"
                ? "Vegetarian"
                : "Non-Vegetarian"
            }
            width={20}
            height={20}
            loading="lazy"
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
            src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt={name}
            width={300}
            height={300}
            loading="lazy"
          />
          <AddToCartBtn
            info={info}
            resInfo={resInfo}
            handleIsDiffRes={handleIsDiffRes}
          />
        </div>
      </div>
      <hr className="my-5" />
      <CartConflictModal
        isOpen={isDiffRes}
        onCancel={handleIsDiffRes}
        onConfirm={handleClearCart}
      />
    </div>
  );
};

export default DetailMenuCard;
