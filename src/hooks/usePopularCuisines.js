import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { generateTrackingId } from "../utils/helper";

const usePopularCuisines = (lat, lng) => {
  const [popularCuisines, setPopularCuisines] = useState([]);

  const fetchPopularCuisines = async () => {
    try {
      const param = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        trackingId: generateTrackingId(),
        includeIMItem: "true",
      });

      const data = await fetch(`${BASE_URL}/landing/PRE_SEARCH?${param}`);
      const res = await data.json();

      const cuisines = res?.data?.cards[1]?.card?.card;
      setPopularCuisines(cuisines);
    } catch (error) {
      console.error("Error fetching popular cuisines:", error);
    }
  };

  useEffect(() => {
    fetchPopularCuisines();
  }, [lat, lng]);

  return { popularCuisines };
};

export default usePopularCuisines;
