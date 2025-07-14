import { Link } from "react-router-dom";
import { IMAGE_URL } from "../utils/constants";
import { useCart } from "../hooks";
import { EmptyCart, CartItem } from "../components/index";

const CartPage = () => {
  const {
    cartItems,
    resInfo,
    totalPrice,
    removeItemHandler,
    clearCartHandler,
    placeOrderHandler,
  } = useCart();

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="w-full">
      <div className="w-[95%] md:w-[800px] mx-auto">
        <Link to={`/restaurantMenu/${resInfo.id}`}>
          <div className="my-10 flex gap-5">
            <img
              className="rounded-xl w-40 aspect-square"
              src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resInfo.cloudinaryImageId}`}
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
          Total - <span className="font-bold">₹{Math.round(totalPrice)}</span>
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
