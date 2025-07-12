import {
  OnYourMind,
  TopRestaurant,
  OnlineFoodDelivery,
  NoRestaurant,
} from "./index";
import { BodyShimmer } from "../shimmer/index";
import { useSelector } from "react-redux";
import { useRestaurants } from "../../hooks";

const Body = () => {
  const {
    topRestaurantData,
    topResTitle,
    onlineTitle,
    onYourMindData,
    data,
    status,
 } = useRestaurants();
  const filterVal = useSelector((state) => state?.filterSlice?.filterVal);

  const filteredData = Array.isArray(topRestaurantData)
    ? topRestaurantData.filter((item) => {
        if (!filterVal) return true;

        switch (filterVal) {
          case "Ratings 4.0+":
            return item?.info?.avgRating > 4;
          case "Rs. 300-Rs. 600":
            return (
              item?.info?.costForTwo?.slice(1, 4) >= "300" &&
              item?.info?.costForTwo?.slice(1, 4) <= "600"
            );
          case "Offers":
            return; //TODO: Implement offers filter logic
          case "Less than Rs. 300":
            return item?.info?.costForTwo?.slice(1, 4) < "300";
          default:
            return true;
        }
      })
    : [];

  if (data?.communication || data?.tid === "") {
    return <NoRestaurant data={data?.cards[0]?.card?.card?.title} />;
  }

  if (status === "loading") {
    return <BodyShimmer />;
  }

  return (
    <div className="w-full ">
      <div className="w-full px-10 sm:w-[90%] lg:w-[80%] mx-auto mt-3 overflow-hidden">
        {onYourMindData.length && <OnYourMind data={onYourMindData} />}

        {topRestaurantData?.length && (
          <TopRestaurant data={topRestaurantData} title={topResTitle} />
        )}

        <OnlineFoodDelivery
          data={filterVal ? filteredData : topRestaurantData}
          title={onlineTitle}
        />
      </div>
    </div>
  );
};

export default Body;
