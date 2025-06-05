import { useContext, useEffect, useState } from "react";
import { Coordinates } from "../context/contextApi";

const useRestaurantsData = () => {
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [topResTitle, setTopResTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [onYourMindData, setOnYourMindData] = useState([]);
  const [data, setData] = useState({});
  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  
  // console.log(
  //   `Fetching data from: ${
  //     import.meta.env.VITE_BASE_URL
  //   }/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
  // );

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Check if the data and cards exist before accessing them
      if (result?.data?.cards) {
        setData(result.data);
        setTopResTitle(result.data.cards[1]?.card?.card?.header?.title || ""); // Provide a default value
        setOnlineTitle(result.data.cards[2]?.card?.card?.title || ""); // Provide a default value

        let mainData = result.data.cards.find(
          (data) => data?.card?.card?.id === "top_brands_for_you"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        let mainData2 = result.data.cards.find(
          (data) => data?.card?.card?.id === "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        setTopRestaurantData(mainData || mainData2 || []); // Provide a default value

        let data2 =
          result.data.cards.find(
            (data) => data?.card?.card?.id === "whats_on_your_mind"
          )?.card?.card?.imageGridCards?.info || []; // Provide a default value

        setOnYourMindData(data2);
      } else {
        console.error("No cards found in the API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  return [topRestaurantData, topResTitle, onlineTitle, onYourMindData, data];
}

export default useRestaurantsData;
