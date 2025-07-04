import { IMAGE_URL } from "../../utils/constants";

const SearchRestaurant = ({
  data: {
    card: {
      card: {
        info: {
          id,
          cloudinaryImageId,
          aggregatedDiscountInfoV3 = {},
          cuisines,
          promoted = false,
          costForTwoMessage,
          name,
          avgRating,
          sla: { slaString },
        },
      },
    },
  },
}) => {
  return (
    <div className="bg-white m-4 p-4 flex gap-5 items-center md:max-w-fit ">
      <div className=" w-[30%] ">
        <img
          className="aspect-square rounded-lg"
          src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${cloudinaryImageId}`}
          alt={name}
        />
      </div>
      <div className="w-[60%]">
        <p className="font-bold line-clamp-1">By {name}</p>
        <p className="my-1">
          {" "}
          <i className="fi fi-ss-star"></i> {avgRating} . {costForTwoMessage}
        </p>
        <p className="line-clamp-1">{cuisines.join(", ")}</p>
      </div>
    </div>
  );
};

export default SearchRestaurant;
