import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toggleLogin } from "../utils/toogleSlice";
import { VEG, NON_VEG, IMAGE_URL } from "../utils/constants";

const Cart = () => {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();

  const totalPrice = cartData.reduce(
    (acc, curVal) => acc + curVal.price / 100 || curVal.defaultPrice / 100,
    0
  );

  const handleRemoveFromCart = (i) => {
    if (cartData.length > 1) {
      const newArr = [...cartData];
      newArr.splice(i, 1);
      dispatch(deleteItem(newArr));
      toast.success("Food removed");
    } else {
      handleClearCart();
      toast.success("cart is cleared");
    }
  };

  const userData = useSelector((state) => state.authSlice.userData);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    if (!userData) {
      toast.error("login krle bhai");
      dispatch(toggleLogin());
      return;
    }
    toast.success("order placed");
  };

  if (cartData.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <img
          className="w-72"
          src={`${IMAGE_URL}fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0`}
          alt="empty cart"
        />
        <h1 className="text-xl mt-4">Your cart is empty</h1>
        <p className="text-gray-500">Please add some items to your cart</p>
        <Link to="/">
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
            Browse Restaurants
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-[95%] md:w-[800px]  mx-auto">
        <Link to={`/restaurantMenu/${resInfo.id}`}>
          <div className="my-10 flex gap-5">
            <img
              className="rounded-xl w-40 aspect-square"
              src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resInfo.cloudinaryImageId}`}
              alt={resInfo.name}
            />
            <div>
              <p className="text-5xl border-b-2 border-black pb-3 ">
                {resInfo.name}
              </p>
              <p className="mt-3 text-xl ">{resInfo.areaName}</p>
            </div>
          </div>
        </Link>
        <hr className="my-5 border-2" />
        <div>
          {cartData.map((item, index) => {
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
            } = item;

            return (
              <div
                key={imageId}
                className="flex w-full my-5 justify-between min-h-[182px]"
              >
                <div className="w-[55%] md:w-[70%]">
                  <img
                    className="w-5 rounded-sm"
                    src={
                      itemAttribute && itemAttribute.vegClassifier === "VEG"
                        ? VEG
                        : NON_VEG
                    }
                    alt={
                      itemAttribute?.vegClassifier === "VEG"
                        ? "Vegetarian"
                        : "Non-Vegetarian"
                    }
                  />
                  <h2 className="font-bold text-lg">{name}</h2>
                  <p className="font-bold text-lg">
                    ₹{defaultPrice / 100 || price / 100}{" "}
                  </p>

                  <div className="flex items-center gap-1">
                    <i className={"fi mt-1 text-xl fi-ss-star"}></i>
                    <span>
                      {rating} ({ratingCountV2})
                    </span>
                  </div>

                  <div className="line-clamp-2">{description}</div>
                </div>
                <div className="w-[40%] md:w-[20%] relative h-full">
                  <img
                    className="rounded-xl aspect-square"
                    src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                    alt={name}
                  />
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                  >
                    Remove
                  </button>
                </div>
                <hr className="my-10" />
              </div>
            );
          })}
        </div>

        <h1 className="text-2xl">
          Total - <span className="font-bold">₹{totalPrice}</span>
        </h1>
        <div className="flex justify-between">
          <button
            onClick={handlePlaceOrder}
            className="p-3 bg-green-600 rounded-lg my-7"
          >
            Place order
          </button>
          <button
            onClick={handleClearCart}
            className="p-3 bg-green-600 rounded-lg my-7"
          >
            clear cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
