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

  const fetchRestaurantData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const url = `${baseUrl}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch restaurant data");

      const result = await response.json();
      const cards = result?.data?.cards;

      if (!cards) {
        console.error("No cards found in the API response");
        return;
      }

      setData(result.data);

      // Extract titles
      setTopResTitle(cards[1]?.card?.card?.header?.title || "");
      setOnlineTitle(cards[2]?.card?.card?.title || "");

      // Extract top restaurant data
      const topBrands = cards.find(
        (item) => item?.card?.card?.id === "top_brands_for_you"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      const restaurantGrid = cards.find(
        (item) => item?.card?.card?.id === "restaurant_grid_listing"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setTopRestaurantData(topBrands || restaurantGrid || []);

      // Extract "What's on your mind" data
      const whatsOnMind = cards.find(
        (item) => item?.card?.card?.id === "whats_on_your_mind"
      )?.card?.card?.imageGridCards?.info;

      setOnYourMindData(whatsOnMind || []);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  useEffect(() => {
    if (lat && lng) fetchRestaurantData();
  }, [lat, lng]);

  return [topRestaurantData, topResTitle, onlineTitle, onYourMindData, data];
};

export default useRestaurantsData;
