import { useContext, useEffect } from "react";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../redux/slices/restaurantSlice";
import { CACHE, BASE_URL } from "../utils/constants";

const useRestaurants = () => {
  const dispatch = useDispatch();
  const {
    topRestaurantData,
    topRestaurantTitle,
    onlineTitle,
    onYourMindData,
    data,
    status,
    error,
  } = useSelector((state) => state.restaurantSlice);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const fetchRestaurantData = async () => {
    const key = `${lat},${lng}`;
    if (CACHE.has(key)) {
      dispatch(fetchSuccess(CACHE.get(key)));
      return;
    }

    try {
      dispatch(fetchStart());
      const url = `${BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch restaurant data");

      const result = await response.json();
      const cards = result?.data?.cards;

      if (!cards) {
        console.error("No cards found in the API response");
        return;
      }

      // Extract top restaurant data
      const topBrands = cards.find(
        (item) => item?.card?.card?.id === "top_brands_for_you"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      const restaurantGrid = cards.find(
        (item) => item?.card?.card?.id === "restaurant_grid_listing"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      // Extract "What's on your mind" data
      const whatsOnMind = cards.find(
        (item) => item?.card?.card?.id === "whats_on_your_mind"
      )?.card?.card?.imageGridCards?.info;

      const payload = {
        topRestaurantData: topBrands || restaurantGrid || [],
        topRestaurantTitle: cards[1]?.card?.card?.header?.title || "",
        onlineTitle: cards[2]?.card?.card?.title || "",
        onYourMindData: whatsOnMind || [],
        data: result.data,
      };

      CACHE.set(key, payload);
      dispatch(fetchSuccess(payload));
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      dispatch(fetchFailure(error.message));
    }
  };

  useEffect(() => {
    if (lat && lng) fetchRestaurantData();
  }, [lat, lng]);

  return {
    topRestaurantData,
    topRestaurantTitle,
    onlineTitle,
    onYourMindData,
    data,
    status,
    error,
  };
};

export default useRestaurants;
