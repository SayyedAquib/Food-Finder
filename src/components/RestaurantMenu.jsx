import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Coordinates } from "../context/contextApi";
import Breadcrumb from "./Breadcrumb";
import RestaurantHeader from "./RestaurantHeader";
import DiscountSection from "./DiscountSection";
import MenuSection from "./MenuSection";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();
  const mainId = id.split("-").at(-1);
  const [resInfo, setResInfo] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState(null);
  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  async function fetchMenu() {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${
        mainId.split("rest")[1]
      }&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = await response.json();

    const resInfo = result?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("food.v2.Restaurant")
    )?.card?.card?.info;
    const discountInfo = result?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("v2.GridWidget")
    )?.card?.card?.gridElements?.infoWithStyle?.offers;

    setResInfo(resInfo);
    setDiscountData(discountInfo);

    const actualMenu = result?.data?.cards.find((data) => data?.groupedCard);
    setTopPicksData(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
        (data) => data.card.card.title === "Top Picks"
      )
    );
    setMenuData(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      ) || []
    );
  }

  useEffect(() => {
    fetchMenu();
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
