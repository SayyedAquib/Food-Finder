import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants";

const EmptyCart = () => (
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

export default EmptyCart;
