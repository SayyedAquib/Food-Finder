import { useContext, useEffect, useState } from "react";
import {
  PromotedRestaurant,
  SearchRestaurant,
  Dish,
  OnYourMind,
} from "./index";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish } from "../utils/toogleSlice";
import Carousel from "./Carousel";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);
  // const [popularCuisines, setPopularCuisines] = useState([]);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const PromotedRes = PromotedRestaurant(SearchRestaurant);

  const { isSimilarResDishes, city, resId, itemId, resLocation } = useSelector(
    (state) => state.toogleSlice.similarResDish
  );
  const dispatch = useDispatch();
  const filterOptions = ["Restaurant", "Dishes"];

  const [activeBtn, setActiveBtn] = useState("Dishes");

  const fetchPopularCuisines = async () => {
    try {
      const data = await fetch(
        "https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/landing/PRE_SEARCH?lat=18.52110&lng=73.85020"
      );
      const res = await data.json();

      const cuisines = res?.data?.cards[1]?.card?.card || [];

      setPopularCuisines(cuisines);
    } catch (error) {
      console.error("Error fetching popular cuisines:", error);
    }
  };

  // useEffect(() => {
  //   fetchPopularCuisines();
  // }, []);

  const handleFilterBtn = (filterName) => {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  };

  const handleSearchQuery = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      setSelectedResDish(null);
      setDishes([]);
    }
  };

  useEffect(() => {
    if (isSimilarResDishes) {
      fetchSimilarResDishes();
    }
  }, [isSimilarResDishes]);

  const fetchSimilarResDishes = async () => {
    const pathname = `/city/${city}/${resLocation}`;
    const encodedPath = encodeURIComponent(pathname);

    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );
    const res = await data.json();

    setSelectedResDish(res?.data?.cards[1]);
    setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards);
    dispatch(resetSimilarResDish());
  };

  const fetchDishes = async () => {
    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
    );
    const res = await data.json();
    console.log(res);
    const finalData = res?.data?.cards
      .find((data) => data?.groupedCard)
      .groupedCard?.cardGroupMap?.DISH?.cards.filter((data) =>
        data?.card?.card?.["@type"].includes("food.v2.Dish")
      );

    console.log(
      res?.data?.cards.find((data) => data?.groupedCard).groupedCard
        ?.cardGroupMap?.DISH?.cards
    );

    console.log("finalData", finalData);
    setDishes(finalData);
  };

  const fetchResaturantData = async () => {
    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );
    const res = await data.json();
    const finalData =
      res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(
        (data) => data?.card?.card?.info
      );
    setRestaurantData(finalData);
  };

  const fetchSearchSuggestions = async () => {
    try {
      const data = await fetch(
        `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/suggest?lat=18.52110&lng=73.85020&str=${searchQuery}&trackingId=undefined&includeIMItem=true`
      );
      const res = await data.json();

      setSearchSuggestions(res?.data?.suggestions || []);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  useEffect(() => {
    // if (searchQuery.trim() === "") return;

    // const timeoutId = setTimeout(() => {
      // fetchSearchSuggestions();
      fetchDishes();
      fetchResaturantData();
    // }, 500);

    // return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto">
      <div className="w-full relative">
        <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-1 absolute top-1/2 -translate-y-1/2"></i>
        <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
        <input
          onKeyDown={handleSearchQuery}
          className="border-2 w-full pl-8 py-3 text-xl focus:outline-none"
          type="text"
          placeholder="Search for restaurant and food"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* {searchQuery.trim() === "" ? (
        <Carousel data={popularCuisines} />
      ) : (
        <div className="w-full  mx-auto bg-white border border-gray-200 rounded-md shadow">
          {searchSuggestions.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                item.highlighted ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              onClick={(e) => {
                setSearchQuery(item.text)
              }}
              onFocus={(e) => {
                setSearchQuery(item.text);
                setSelectedResDish(null);
                setDishes([]);
              }}
              onBlur={(e) => {
                setSearchQuery("");
                setSelectedResDish(null);
                setDishes([]);
              }}
            >
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.cloudinaryId}`}
                alt={item.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.text}
                </p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {!selectedResDish && (
        <div className="my-7 flex flex-wrap gap-3">
          {filterOptions.map((filterName, i) => (
            <button
              key={i}
              onClick={() => handleFilterBtn(filterName)}
              className={
                "filterBtn flex gap-2 " +
                (activeBtn === filterName ? "active" : "")
              }
            >
              <p>{filterName}</p>
            </button>
          ))}
        </div>
      )}

      {dishes?.length === 0 && restaurantData?.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f4f5f7] p-4 rounded-md">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-start"
            >
              <div className="w-20 h-20 bg-gray-300 rounded-md flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-grow">
                <div className="w-3/4 h-4 bg-gray-300 rounded" />
                <div className="w-1/2 h-4 bg-gray-300 rounded" />
                <div className="w-full h-3 bg-gray-200 rounded" />
                <div className="w-2/3 h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full md:w-[800px] mt-5  grid grid-cols-1 md:grid-cols-2   bg-[#f4f5f7]">
        {selectedResDish ? (
          <>
            <div>
              <p className="p-4">Item added to cart</p>
              <Dish data={selectedResDish.card.card} />
              <p className="p-4">More dishes from this restaurant</p>
            </div>
            <br />

            {similarResDishes.map((data, i) => (
              <Dish
                key={i}
                data={{
                  ...data.card,
                  restaurant: selectedResDish.card.card.restaurant,
                }}
              />
            ))}
          </>
        ) : activeBtn === "Dishes" ? (
          dishes?.map((data, i) => <Dish key={i} data={data.card.card} />)
        ) : (
          restaurantData.map((data, i) =>
            data?.card?.card?.info?.promoted ? (
              <PromotedRes data={data} key={i} />
            ) : (
              <SearchRestaurant data={data} key={i} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Search;
