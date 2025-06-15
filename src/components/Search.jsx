import { useContext, useEffect, useState } from "react";
import { PromotedRestaurant, SearchRestaurant, Dish } from "./index";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish } from "../utils/toogleSlice";
import { BASE_URL } from "../utils/constants";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);

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
      fetchSimilarRestaurantDishes();
    }
  }, [isSimilarResDishes]);

  const fetchSimilarRestaurantDishes = async () => {
    const requiredParams = {
      lat,
      lng,
      searchQuery,
      city,
      resLocation,
      resId,
      itemId,
    };
    const missingParams = Object.entries(requiredParams)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingParams.length > 0) {
      console.error(
        "Missing required parameters for similar dishes fetch:",
        missingParams
      );
      return;
    }

    try {
      const restaurantPath = `/city/${city}/${resLocation}`;
      const restaurantMenuUrl = `${restaurantPath}-rest${resId}%3Fquery%3D${encodeURIComponent(
        searchQuery
      )}`;

      const searchUrl = new URL(`${BASE_URL}/restaurants/search/v3`);
      const searchParams = {
        lat: lat.toString(),
        lng: lng.toString(),
        str: searchQuery,
        trackingId: "null",
        submitAction: "ENTER",
        selectedPLTab: "dish-add",
        restaurantMenuUrl: restaurantMenuUrl,
        restaurantIdOfAddedItem: resId.toString(),
        itemAdded: itemId.toString(),
      };

      Object.entries(searchParams).forEach(([key, value]) => {
        searchUrl.searchParams.set(key, value);
      });

      const response = await fetch(searchUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result?.data?.cards) {
        throw new Error("Invalid API response structure");
      }

      const cards = result.data.cards;

      const selectedDish = extractSelectedRestaurantDish(cards);
      setSelectedResDish(selectedDish);

      const similarDishes = extractSimilarRestaurantDishes(cards);
      setSimilarResDishes(similarDishes);

      dispatch(resetSimilarResDish());
    } catch (error) {
      console.error("Error fetching similar restaurant dishes:", error);

      setSelectedResDish(null);
      setSimilarResDishes([]);
    }
  };

  const extractSelectedRestaurantDish = (cards) => {
    try {
      const selectedDishCard = cards[1];

      if (!selectedDishCard) {
        console.warn("No selected restaurant dish found in API response");
        return null;
      }

      return selectedDishCard;
    } catch (error) {
      console.warn("Error extracting selected restaurant dish:", error);
      return null;
    }
  };

  const extractSimilarRestaurantDishes = (cards) => {
    try {
      const similarDishesCard = cards[2];

      if (!similarDishesCard?.card?.card?.cards) {
        console.warn("No similar restaurant dishes found in API response");
        return [];
      }

      const dishes = similarDishesCard.card.card.cards;

      if (!Array.isArray(dishes)) {
        console.warn("Similar dishes data is not an array:", dishes);
        return [];
      }

      return dishes;
    } catch (error) {
      console.warn("Error extracting similar restaurant dishes:", error);
      return [];
    }
  };

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

  const extractDishesFromResponse = (cards) => {
    try {
      const groupedCard = cards.find((card) => card?.groupedCard);

      if (!groupedCard?.groupedCard?.cardGroupMap?.DISH?.cards) {
        console.warn("No dish data found in API response");
        return [];
      }

      const dishCards = groupedCard.groupedCard.cardGroupMap.DISH.cards;

      const validDishes = dishCards.filter((card) => {
        const cardType = card?.card?.card?.["@type"];
        return cardType && cardType.includes("food.v2.Dish");
      });

      if (validDishes.length === 0) {
        console.warn("No valid dishes found in response");
        return [];
      }

      return validDishes;
    } catch (error) {
      console.warn("Error extracting dishes from response:", error);
      return [];
    }
  };

  const generateTrackingId = () => {
    return "xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, () => {
      return ((Math.random() * 16) | 0).toString(16);
    });
  };

  const generateQueryId = () => {
    return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, () => {
      return ((Math.random() * 16) | 0).toString(16);
    });
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

  const extractRestaurantsFromResponse = (cards) => {
    try {
      if (!Array.isArray(cards) || cards.length === 0) {
        console.warn("No cards found in API response");
        return [];
      }

      const restaurantCard = cards[0];

      if (!restaurantCard?.groupedCard?.cardGroupMap?.RESTAURANT?.cards) {
        console.warn("No restaurant data found in API response structure");
        return [];
      }

      const restaurantCards =
        restaurantCard.groupedCard.cardGroupMap.RESTAURANT.cards;

      if (!Array.isArray(restaurantCards)) {
        console.warn("Restaurant cards is not an array:", restaurantCards);
        return [];
      }

      const validRestaurants = restaurantCards.filter((card) => {
        return card?.card?.card?.info;
      });

      if (validRestaurants.length === 0) {
        console.warn("No valid restaurants found in response");
        return [];
      }

      return validRestaurants;
    } catch (error) {
      console.warn("Error extracting restaurants from response:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchDishesFromSearch();
    fetchRestaurantSearchData();
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
              <p className="p-4 text-lg font-semibold text-gray-700 mt-6">
                Item added to cart
              </p>
              <Dish data={selectedResDish.card.card} />
              <p className="p-4 text-lg font-semibold text-gray-700 mt-6">
                More dishes from this restaurant
              </p>
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
