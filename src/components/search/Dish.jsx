import React, { useMemo, useCallback } from "react";
import { AddToCartBtn, CartConflictModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  setSimilarResDish,
  toggleDiffRes,
} from "../../redux/slices/toggleSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { VEG, NON_VEG, IMAGE_URL } from "../../utils/constants";

const Dish = React.memo(
  ({
    data: {
      info,
      restaurant: { info: resInfo },
      hideRestaurantDetails = false,
    },
  }) => {
    const { imageId = "", name, price, isVeg = 0, id: itemId } = info;
    const {
      id,
      name: resName,
      avgRating,
      sla: { slaString },
      slugs: { city, restaurant: resLocation },
    } = resInfo;

    const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);
    const { id: cartResId } = useSelector((state) => state.cartSlice.resInfo);
    const dispatch = useDispatch();

    const imageSrc = useMemo(
      () => `${IMAGE_URL}fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`,
      [imageId]
    );

    const displayPrice = useMemo(() => price / 100, [price]);

    const restaurantLink = useMemo(
      () => `/restaurantMenu/${resLocation}-${id}`,
      [resLocation, id]
    );

    const handleIsDiffRes = useCallback(
      () => dispatch(toggleDiffRes()),
      [dispatch]
    );

    const handleClearCart = useCallback(() => {
      dispatch(clearCart());
      dispatch(toggleDiffRes());
    }, [dispatch]);

    const handleSameRes = useCallback(() => {
      if (cartResId == id || !cartResId) {
        dispatch(
          setSimilarResDish({
            isSimilarResDishes: true,
            city,
            resLocation,
            resId: id,
            itemId,
          })
        );
      }
    }, [cartResId, id, dispatch, city, resLocation, itemId]);

    return (
      <>
        <div className="bg-white rounded-2xl p-4 m-4">
          {!hideRestaurantDetails && (
            <>
              <Link to={restaurantLink}>
                <div className="flex justify-between text-sm opacity-50">
                  <div className="">
                    <p className="font-bold">By {resName}</p>
                    <p className="my-2">
                      <i className="fi fi-ss-star"></i> {avgRating} .{" "}
                      {slaString}
                    </p>
                  </div>
                  <i className="fi fi-rr-arrow-small-right text-2xl"></i>
                </div>
              </Link>
              <hr className="border-dotted" />
            </>
          )}

          <div className="my-3 md:max-w-fit flex justify-between">
            <div className="w-[50%]  md:w-[168px] flex flex-col gap-1">
              <div className="w-5 h-5">
                {isVeg ? (
                  <img src={VEG} alt="Vegetarian" />
                ) : (
                  <img src={NON_VEG} alt="Non-Vegetarian" />
                )}
              </div>
              <p className="text-lg font-semibold">{name}</p>
              <p>
                <i className="fi fi-bs-indian-rupee-sign text-sm pt-1 inline-block"></i>
                {displayPrice}
              </p>
              <button className="px-4 py-1 w-max rounded-3xl border">
                More Details
              </button>
            </div>

            <div className="w-[40%] md:w-[40%] relative h-full">
              <img
                className="rounded-xl object-cover aspect-square"
                src={imageSrc}
                alt={name}
              />
              <div onClick={handleSameRes}>
                <AddToCartBtn
                  info={info}
                  resInfo={resInfo}
                  handleIsDiffRes={handleIsDiffRes}
                />
              </div>
            </div>
          </div>
        </div>

        <CartConflictModal
          isOpen={isDiffRes}
          onCancel={handleIsDiffRes}
          onConfirm={handleClearCart}
        />
      </>
    );
  }
);

Dish.displayName = "Dish";

export default Dish;
