import { OnYourMind, TopRestaurant, OnlineFoodDelivey, Shimmer, Footer } from "./index";
import { useSelector } from "react-redux";
import useRestaurantsData from "../hooks/useRestaurantsData";

const Body = () => {
  const [topRestaurantData, topResTitle, onlineTitle, onYourMindData, data] =
    useRestaurantsData();
  const filterVal = useSelector((state) => state?.filterSlice?.filterVal);

  // Ensure topRestaurantData is an array before filtering
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
            return; // Handle this case appropriately
          case "Less than Rs. 300":
            return item?.info?.costForTwo?.slice(1, 4) < "300";
          default:
            return true;
        }
      })
    : []; // Default to an empty array if topRestaurantData is not an array

  if (data.communication || data.tid === "") {
    return (
      <div className="flex mt-64 overflow-hidden justify-center items-center flex-col">
        <img
          className="w-72"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt=""
        />
        <h1 className="text-lg font-bold">{data?.cards[0]?.card?.card?.title}</h1>
      </div>
    );
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
