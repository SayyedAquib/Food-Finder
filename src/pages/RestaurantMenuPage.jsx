import { useContext } from "react";
import { Coordinates } from "../context/contextApi";
import { useParams } from "react-router-dom";
import { useMenu } from "../hooks";
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

  const { resInfo, menuData, discountData, topPicksData, status } = useMenu(
    lat,
    lng,
    mainId
  );

  if (status === "loading") {
    return <MenuShimmer />;
  }

  return (
    <div className="w-full">
      {menuData.length > 0 && (
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
      )}
    </div>
  );
};

export default RestaurantMenuPage;
