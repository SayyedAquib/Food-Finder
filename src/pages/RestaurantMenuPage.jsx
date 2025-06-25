import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Coordinates } from "../context/contextApi";
import {
  Breadcrumb,
  RestaurantDetails,
  DiscountSection,
  MenuSection,
  MenuShimmer,
} from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { setMenuData } from "../redux/slices/restaurantMenuSlice";
import { CACHE, BASE_URL } from "../utils/constants";
import { extractDiscountInfo, extractMenuData, extractRestaurantInfo } from "../utils/helper";

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const mainId = id.split("-").at(-1);

  const dispatch = useDispatch();
  const { resInfo, menuData, discountData, topPicksData } = useSelector(
    (state) => state.restaurantMenuSlice
  );

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const fetchRestaurantMenu = async () => {
    if (CACHE.has(`${lat}-${lng}-${mainId}`)) {
      const cachedData = CACHE.get(`${lat}-${lng}-${mainId}`);
      dispatch(setMenuData(cachedData));
      return;
    }

    if (!lat || !lng || !mainId) {
      console.error("Missing required parameters for menu fetch:", {
        lat,
        lng,
        mainId,
      });
      return;
    }

    try {
      const restaurantId = mainId.includes("rest")
        ? mainId.split("rest")[1]
        : mainId;

      if (!restaurantId) {
        throw new Error("Invalid restaurant ID format");
      }

      const menuUrl = new URL(`${BASE_URL}/menu/pl`);
      menuUrl.searchParams.set("page-type", "REGULAR_MENU");
      menuUrl.searchParams.set("complete-menu", "true");
      menuUrl.searchParams.set("lat", lat.toString());
      menuUrl.searchParams.set("lng", lng.toString());
      menuUrl.searchParams.set("restaurantId", restaurantId);
      menuUrl.searchParams.set("catalog_qa", "undefined");
      menuUrl.searchParams.set("submitAction", "ENTER");

      const response = await fetch(menuUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result?.data?.cards) {
        throw new Error("Invalid API response structure");
      }

      const cards = result.data.cards;

      const restaurantInfo = extractRestaurantInfo(cards);

      const discountInfo = extractDiscountInfo(cards);

      const { topPicks, menuItems } = extractMenuData(cards);

      const payload = {
        resInfo: restaurantInfo,
        discountData: discountInfo,
        topPicksData: topPicks,
        menuData: menuItems,
      };

      dispatch(setMenuData(payload));
      CACHE.set(`${lat}-${lng}-${mainId}`, payload);
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantMenu();
  }, [lat, lng, mainId]);

  return (
    <div className="w-full">
      {menuData.length ? (
        <div className="w-[95%] md:w-[800px] mx-auto pt-8">
          <Breadcrumb resInfo={resInfo} />
          <RestaurantDetails resInfo={resInfo} />
          <DiscountSection discountData={discountData} />
          <MenuSection
            topPicksData={topPicksData}
            menuData={menuData}
            resInfo={resInfo}
          />
        </div>
      ) : (
        <MenuShimmer />
      )}
    </div>
  );
};

export default RestaurantMenuPage;
