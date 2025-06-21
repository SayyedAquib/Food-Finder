import { useContext, useState } from "react";
import {
  Carousel,
  SearchInput,
  SearchSuggestions,
  FilterButtons,
  SearchResults,
} from "../components/index";
import { Coordinates } from "../context/contextApi";
import { useSelector } from "react-redux";
import useSearchSuggestions from "../hooks/useSearchSuggestions";
import useSearchData from "../hooks/useSearchData";
import useSimilarDishes from "../hooks/useSimilarDishes";
import usePopularCuisines from "../hooks/usePopularCuisines";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(true);
  const [activeBtn, setActiveBtn] = useState("");

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const { isSimilarResDishes, city, resId, itemId, resLocation } = useSelector(
    (state) => state.toggleSlice.similarResDish
  );

  const { searchSuggestions } = useSearchSuggestions(searchQuery, lat, lng);
  const { dishes, restaurantData } = useSearchData(
    searchQuery,
    lat,
    lng,
    activeBtn
  );
  const { selectedResDish, similarResDishes, setSelectedResDish } =
    useSimilarDishes(
      isSimilarResDishes,
      lat,
      lng,
      searchQuery,
      city,
      resLocation,
      resId,
      itemId
    );
  const { popularCuisines } = usePopularCuisines(lat, lng);

  const handleFilterBtn = (filterName) => {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  };

  const handleSearchQuery = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      setSelectedResDish(null);
    }
  };

  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setVisible={setVisible}
        handleSearchQuery={handleSearchQuery}
      />

      {searchQuery.trim() === "" && <Carousel data={popularCuisines} />}

      <SearchSuggestions
        searchSuggestions={searchSuggestions}
        visible={visible}
        setSearchQuery={setSearchQuery}
        setVisible={setVisible}
        setActiveBtn={setActiveBtn}
      />

      <FilterButtons
        activeBtn={activeBtn}
        handleFilterBtn={handleFilterBtn}
        selectedResDish={selectedResDish}
        visible={visible}
      />

      <SearchResults
        selectedResDish={selectedResDish}
        similarResDishes={similarResDishes}
        activeBtn={activeBtn}
        dishes={dishes}
        restaurantData={restaurantData}
      />
    </div>
  );
};

export default SearchPage;
