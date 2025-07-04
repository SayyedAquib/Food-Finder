import React, { useMemo, useCallback } from "react";
import { AddToCartBtn, CartConflictModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  setSimilarResDish,
  toggleDiffRes,
} from "../../redux/slices/toggleSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import {
  ImageCard,
  RatingDisplay,
  PriceDisplay,
  VegIndicator,
  Card,
  LinkWrapper,
} from "../index";

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

    const RestaurantHeader = () => (
      <>
        <LinkWrapper to={restaurantLink}>
          <div className="flex justify-between text-sm opacity-50">
            <div>
              <p className="font-bold">By {resName}</p>
              <RatingDisplay
                rating={avgRating}
                additionalInfo={slaString}
                className="my-2"
              />
            </div>
            <i className="fi fi-rr-arrow-small-right text-2xl"></i>
          </div>
        </LinkWrapper>
        <hr className="border-dotted" />
      </>
    );

    const DishContent = () => (
      <div className="my-3 md:max-w-fit flex justify-between">
        <div className="w-[50%] md:w-[168px] flex flex-col gap-1">
          <VegIndicator isVeg={isVeg} />
          <p className="text-lg font-semibold">{name}</p>
          <PriceDisplay price={displayPrice} />
          <button className="px-4 py-1 w-max rounded-3xl border">
            More Details
          </button>
        </div>

        <div className="w-[40%] md:w-[40%] relative h-full">
          <ImageCard
            imageId={imageId}
            alt={name}
            className="rounded-xl"
            overlayContent={
              <div onClick={handleSameRes}>
                <AddToCartBtn
                  info={info}
                  resInfo={resInfo}
                  handleIsDiffRes={handleIsDiffRes}
                  aria-label={`Add ${name} to cart`}
                />
              </div>
            }
          />
        </div>
      </div>
    );

    return (
      <>
        <Card>
          {!hideRestaurantDetails && <RestaurantHeader />}
          <DishContent />
        </Card>

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
