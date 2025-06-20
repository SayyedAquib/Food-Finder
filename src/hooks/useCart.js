import { useSelector } from "react-redux";

const useCart = () => {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const user = useSelector((state) => state.authSlice.userData);
  return { cartItems, resInfo, user };
};

export default useCart;
