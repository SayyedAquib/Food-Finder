import { useDispatch, useSelector } from "react-redux";
import { calculateTotalPrice } from "../utils/helper";
import { clearCart, deleteItem } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { toggleLogin } from "../redux/slices/toggleSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const user = useSelector((state) => state.authSlice.userData);

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

  return {
    cartItems,
    resInfo,
    totalPrice,
    removeItemHandler,
    clearCartHandler,
    placeOrderHandler,
  };
};

export default useCart;
