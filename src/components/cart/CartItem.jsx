import { IMAGE_URL, NON_VEG, VEG } from "../../utils/constants";

const CartItem = ({ item, index, onRemove }) => {
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
        <p className="font-bold text-lg">₹{(defaultPrice || price) / 100}</p>
        <div className="flex items-center gap-1">
          <i className="fi mt-1 text-xl fi-ss-star"></i>
          <span>
            {rating} ({ratingCountV2})
          </span>
        </div>
        <div className="line-clamp-2">{description}</div>
      </div>

      <div className="w-[40%] md:w-[20%] relative h-full">
        <img
          className="rounded-xl aspect-square"
          src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_auto,h_auto,c_fit/${imageId}`}
          alt={name}
          loading="lazy"
          width={300}
          height={300}
        />
        <button
          onClick={() => onRemove(index)}
          className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
          aria-label={`Remove ${name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
