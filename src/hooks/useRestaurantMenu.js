import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuData } from "../redux/slices/restaurantMenuSlice";
import { CACHE, BASE_URL } from "../utils/constants";
import {
  extractDiscountInfo,
  extractMenuData,
  extractRestaurantInfo,
} from "../utils/helper";

const useRestaurantMenu = (lat, lng, mainId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      if (!lat || !lng || !mainId) {
        console.error("Missing required parameters:", { lat, lng, mainId });
        return;
      }

      const cacheKey = `${lat}-${lng}-${mainId}`;
      if (CACHE.has(cacheKey)) {
        dispatch(setMenuData(CACHE.get(cacheKey)));
        return;
      }

      try {
        const restaurantId = mainId.includes("rest")
          ? mainId.split("rest")[1]
          : mainId;

        const menuUrl = new URL(`${BASE_URL}/menu/pl`);
        menuUrl.searchParams.set("page-type", "REGULAR_MENU");
        menuUrl.searchParams.set("complete-menu", "true");
        menuUrl.searchParams.set("lat", lat.toString());
        menuUrl.searchParams.set("lng", lng.toString());
        menuUrl.searchParams.set("restaurantId", restaurantId);
        menuUrl.searchParams.set("catalog_qa", "undefined");
        menuUrl.searchParams.set("submitAction", "ENTER");

        const response = await fetch(menuUrl.toString());
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const result = await response.json();
        const cards = result?.data?.cards;
        if (!cards) throw new Error("Invalid API response structure");

        const resInfo = extractRestaurantInfo(cards);
        const discountData = extractDiscountInfo(cards);
        const { topPicks, menuItems } = extractMenuData(cards);

        const payload = {
          resInfo,
          discountData,
          topPicksData: topPicks,
          menuData: menuItems,
        };

        dispatch(setMenuData(payload));
        CACHE.set(cacheKey, payload);
      } catch (error) {
        console.error("Error fetching restaurant menu:", error);
      }
    };

    fetchRestaurantMenu();
  }, [lat, lng, mainId, dispatch]);
};

export default useRestaurantMenu;
