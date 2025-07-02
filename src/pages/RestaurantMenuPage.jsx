import { useContext } from "react";
import { Coordinates } from "../context/contextApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRestaurantMenu } from "../hooks";
import {
  Breadcrumb,
  RestaurantDetails,
  DiscountSection,
  MenuSection,
  MenuShimmer,
} from "../components/index";

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const mainId = id.split("-").at(-1);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  useRestaurantMenu(lat, lng, mainId);

  const { resInfo, menuData, discountData, topPicksData } = useSelector(
    (state) => state.restaurantMenuSlice
  );

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
