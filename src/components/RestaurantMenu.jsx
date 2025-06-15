import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Coordinates } from "../context/contextApi";
import {
  Breadcrumb,
  RestaurantHeader,
  DiscountSection,
  MenuSection,
  MenuShimmer,
} from "./index";
import { useDispatch, useSelector } from "react-redux";
import { setMenuData } from "../utils/restaurantMenuSlice";
import { CACHE } from "../utils/constants";

const RestaurantMenu = () => {
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

      const menuUrl = new URL(`${import.meta.env.VITE_BASE_URL}/menu/pl`);
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

  const extractRestaurantInfo = (cards) => {
    try {
      return (
        cards.find((card) =>
          card?.card?.card?.["@type"]?.includes("food.v2.Restaurant")
        )?.card?.card?.info || null
      );
    } catch (error) {
      console.warn("Error extracting restaurant info:", error);
      return null;
    }
  };

  const extractDiscountInfo = (cards) => {
    try {
      return (
        cards.find((card) =>
          card?.card?.card?.["@type"]?.includes("v2.GridWidget")
        )?.card?.card?.gridElements?.infoWithStyle?.offers || []
      );
    } catch (error) {
      console.warn("Error extracting discount info:", error);
      return [];
    }
  };

  const extractMenuData = (cards) => {
    try {
      const menuCard = cards.find((card) => card?.groupedCard);

      if (!menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
        return { topPicks: null, menuItems: [] };
      }

      const regularCards = menuCard.groupedCard.cardGroupMap.REGULAR.cards;

      const topPicks =
        regularCards.find((card) => card?.card?.card?.title === "Top Picks") ||
        null;

      const menuItems = regularCards.filter(
        (card) => card?.card?.card?.itemCards || card?.card?.card?.categories
      );

      return { topPicks, menuItems };
    } catch (error) {
      console.warn("Error extracting menu data:", error);
      return { topPicks: null, menuItems: [] };
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
          <RestaurantHeader resInfo={resInfo} />
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

export default RestaurantMenu;
