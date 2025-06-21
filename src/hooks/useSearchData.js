import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import {
  extractDishesFromResponse,
  extractRestaurantsFromResponse,
  generateTrackingId,
  generateQueryId,
} from "../utils/helper";

const useSearchData = (searchQuery, lat, lng, activeBtn) => {
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const fetchDishesFromSearch = async () => {
    if (!searchQuery.trim() || searchQuery.split("").length <= 1) return;

    if (!lat || !lng) {
      console.error("Missing required parameters for dishes search:", {
        lat,
        lng,
      });
      setDishes([]);
      return;
    }

    try {
      const dishSearchUrl = new URL(`${BASE_URL}/restaurants/search/v3`);
      const searchParams = {
        lat: lat.toString(),
        lng: lng.toString(),
        str: searchQuery.trim(),
        trackingId: generateTrackingId(),
        submitAction: "ENTER",
        queryUniqueId: generateQueryId(),
      };

      Object.entries(searchParams).forEach(([key, value]) => {
        dishSearchUrl.searchParams.set(key, value);
      });

      const response = await fetch(dishSearchUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result?.data?.cards) {
        throw new Error("Invalid API response structure");
      }

      const dishData = extractDishesFromResponse(result.data.cards);
      setDishes(dishData);
    } catch (error) {
      console.error("Error fetching dishes from search:", error);
      setDishes([]);
    }
  };

  const fetchRestaurantSearchData = async () => {
    if (!searchQuery.trim() || searchQuery.split("").length <= 1) return;

    if (!lat || !lng) {
      console.error("Missing required parameters for restaurant search:", {
        lat,
        lng,
      });
      setRestaurantData([]);
      return;
    }

    try {
      const restaurantSearchUrl = new URL(`${BASE_URL}/restaurants/search/v3`);
      const searchParams = {
        lat: lat.toString(),
        lng: lng.toString(),
        str: searchQuery.trim(),
        trackingId: generateTrackingId(),
        submitAction: "ENTER",
        queryUniqueId: generateQueryId(),
        selectedPLTab: "RESTAURANT",
      };

      Object.entries(searchParams).forEach(([key, value]) => {
        restaurantSearchUrl.searchParams.set(key, value);
      });

      const response = await fetch(restaurantSearchUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result?.data?.cards) {
        throw new Error("Invalid API response structure");
      }

      const restaurantData = extractRestaurantsFromResponse(result.data.cards);
      setRestaurantData(restaurantData);
    } catch (error) {
      console.error("Error fetching restaurant search data:", error);
      setRestaurantData([]);
    }
  };

  useEffect(() => {
    fetchDishesFromSearch();
    fetchRestaurantSearchData();
  }, [activeBtn]);

  return { dishes, restaurantData };
};

export default useSearchData;