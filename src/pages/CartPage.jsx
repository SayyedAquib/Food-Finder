import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../redux/slices/toggleSlice";
import toast from "react-hot-toast";
import { IMAGE_URL } from "../utils/constants";
import { useCart } from "../hooks";
import { calculateTotalPrice } from "../utils/helper";
import { EmptyCart, CartItem } from "../components/index";
import { clearCart, deleteItem } from "../redux/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, resInfo, user } = useCart();

  const totalPrice = calculateTotalPrice(cartItems);

  const removeItemHandler = (index) => {
    if (cartItems.length > 1) {
      const newItems = [...cartItems];
      newItems.splice(index, 1);
      dispatch(deleteItem(newItems));
      toast.success("Food removed", {
        duration: 2000,
      });
    } else {
      clearCartHandler();
      toast.success("Cart is cleared", {
        duration: 2000,
      });
    }
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const placeOrderHandler = () => {
    if (!user) {
      toast.error("Login required to place order", {
        duration: 2000,
      });
      dispatch(toggleLogin());
      return;
    }
    toast.success("Order placed successfully", {
      duration: 2000,
    });
    clearCartHandler();
  };

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="w-full">
      <div className="w-[95%] md:w-[800px] mx-auto">
        <Link to={`/restaurantMenu/${resInfo.id}`}>
          <div className="my-10 flex gap-5">
            <img
              className="rounded-xl w-40 aspect-square"
              src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_auto,h_auto,c_fit/${resInfo.cloudinaryImageId}`}
              alt={resInfo.name}
              width={300}
              height={300}
              loading="lazy"
            />
            <div>
              <p className="text-5xl border-b-2 border-black pb-3">
                {resInfo.name}
              </p>
              <p className="mt-3 text-xl">{resInfo.areaName}</p>
            </div>
          </div>
        </Link>

        <hr className="my-5 border-2" />

        <div>
          {cartItems.map((item, idx) => (
            <CartItem
              key={item.imageId}
              item={item}
              index={idx}
              onRemove={removeItemHandler}
            />
          ))}
        </div>

        <h1 className="text-2xl">
          Total - <span className="font-bold">₹{totalPrice}</span>
        </h1>

        <div className="flex justify-between">
          <button
            onClick={placeOrderHandler}
            className="p-3 bg-green-600 rounded-lg my-7 text-white"
          >
            Place Order
          </button>
          <button
            onClick={clearCartHandler}
            className="p-3 bg-red-600 rounded-lg my-7 text-white"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
