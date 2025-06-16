import {
  OnYourMind,
  TopRestaurant,
  OnlineFoodDelivey,
  Shimmer,
  Footer,
} from "./index";
import { useSelector } from "react-redux";
import useRestaurantsData from "../hooks/useRestaurantsData";
import { IMAGE_URL } from "../utils/constants";

const Body = () => {
  const [
    topRestaurantData,
    topResTitle,
    onlineTitle,
    onYourMindData,
    data,
    status,
  ] = useRestaurantsData();
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
    return (
      <div className="flex mt-64 overflow-hidden justify-center items-center flex-col">
        <img
          className="w-72"
          src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png`}
          alt="unserviceable location"
        />
        <h1 className="text-lg font-bold">
          {data?.cards[0]?.card?.card?.title}
        </h1>
      </div>
    );
  }

  if (status === "loading") {
    return <Shimmer />;
  }

  return (
    <div className="w-full ">
      {topRestaurantData?.length ? (
        <div className="w-full px-10 sm:w-[90%] lg:w-[80%] mx-auto mt-3 overflow-hidden">
          {onYourMindData.length ? (
            <>
              <OnYourMind data={onYourMindData} />
              <TopRestaurant data={topRestaurantData} title={topResTitle} />
            </>
          ) : (
            ""
          )}

          <OnlineFoodDelivey
            data={filterVal ? filteredData : topRestaurantData}
            title={onlineTitle}
          />
        </div>
      ) : (
        <Shimmer />
      )}
      <Footer />
    </div>
  );
};

export default Body;
