import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { resetSimilarRestaurantDish } from "../redux/slices/toggleSlice";
import {
  extractSelectedRestaurantDish,
  extractSimilarRestaurantDishes,
  generateTrackingId,
} from "../utils/helper";

const useSimilarDishes = (
  isSimilarResDishes,
  lat,
  lng,
  searchQuery,
  city,
  resLocation,
  resId,
  itemId
) => {
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarRestaurantDishes] = useState([]);
  const dispatch = useDispatch();

  const fetchSimilarRestaurantDishes = async () => {
    const requiredParams = {
      lat,
      lng,
      searchQuery,
      city,
      resLocation,
      resId,
      itemId,
    };

    const missingParams = Object.entries(requiredParams)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingParams.length > 0) {
      console.error(
        "Missing required parameters for similar dishes fetch:",
        missingParams
      );
      return;
    }

    try {
      const restaurantPath = `/city/${city}/${resLocation}`;
      const restaurantMenuUrl = `${restaurantPath}-rest${resId}%3Fquery%3D${encodeURIComponent(
        searchQuery
      )}`;

      const searchUrl = new URL(`${BASE_URL}/restaurants/search/v3`);
      const searchParams = {
        lat: lat.toString(),
        lng: lng.toString(),
        str: searchQuery,
        trackingId: generateTrackingId(),
        submitAction: "ENTER",
        selectedPLTab: "dish-add",
        restaurantMenuUrl: restaurantMenuUrl,
        restaurantIdOfAddedItem: resId.toString(),
        itemAdded: itemId.toString(),
      };

      Object.entries(searchParams).forEach(([key, value]) => {
        searchUrl.searchParams.set(key, value);
      });

      const response = await fetch(searchUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result?.data?.cards) {
        throw new Error("Invalid API response structure");
      }

      const cards = result.data.cards;

      const selectedDish = extractSelectedRestaurantDish(cards);
      setSelectedResDish(selectedDish);

      const similarDishes = extractSimilarRestaurantDishes(cards);
      setSimilarRestaurantDishes(similarDishes);

      dispatch(resetSimilarRestaurantDish());
    } catch (error) {
      console.error("Error fetching similar restaurant dishes:", error);
      setSelectedResDish(null);
      setSimilarRestaurantDishes([]);
    }
  };

  useEffect(() => {
    if (isSimilarResDishes) {
      fetchSimilarRestaurantDishes();
    }
  }, [isSimilarResDishes]);

  return { selectedResDish, similarResDishes, setSelectedResDish };
};

export default useSimilarDishes;
