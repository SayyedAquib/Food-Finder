import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const AddToCartBtn = ({ info, resInfo, handleIsDiffRes }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const currentResInfo = useSelector((state) => state.cartSlice.resInfo);

  const itemExists = cartItems.some((item) => item.id === info.id);
  const isSameRestaurant =
    currentResInfo.length === 0 || currentResInfo.name === resInfo.name;

  const handleAddToCart = () => {
    if (itemExists) {
      toast.error("Item already in the cart");
      return;
    }

    if (isSameRestaurant) {
      dispatch(addToCart({ info, resInfo }));
      toast.success("Item added to the cart");
    } else {
      toast.error("Items from different restaurants cannot be added");
      handleIsDiffRes();
    }
  };

  const getButtonStyle = () => {
    if (itemExists) {
      return "bg-gray-200 text-gray-500 cursor-not-allowed";
    }
    if (!isSameRestaurant) {
      return "bg-red-100 text-red-600 border-red-400 cursor-pointer";
    }
    return "bg-white text-green-700 border-green-500 hover:bg-green-50 cursor-pointer";
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-lg font-bold rounded-xl border px-10 py-2 drop-shadow transition-all duration-200 ${getButtonStyle()}`}
      disabled={itemExists}
    >
      {itemExists ? "Added" : "Add"}
    </button>
  );
};

export default AddToCartBtn;
