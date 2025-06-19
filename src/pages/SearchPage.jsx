import { useCallback, useContext, useEffect, useState } from "react";
import {
  PromotedRestaurant,
  SearchRestaurant,
  Dish,
  Carousel,
} from "../components/index";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish } from "../redux/slices/toggleSlice";
import { BASE_URL, CACHE, IMAGE_URL } from "../utils/constants";
import {
  extractDishesFromResponse,
  extractRestaurantsFromResponse,
  extractSelectedRestaurantDish,
  extractSimilarRestaurantDishes,
  generateQueryId,
  generateTrackingId,
} from "../utils/helper";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [popularCuisines, setPopularCuisines] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);
  const [visible, setVisible] = useState(true);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const PromotedRes = PromotedRestaurant(SearchRestaurant);

  const { isSimilarResDishes, city, resId, itemId, resLocation } = useSelector(
    (state) => state.toggleSlice.similarResDish
  );
  const dispatch = useDispatch();
  const filterOptions = ["Restaurant", "Dishes"];

  const [activeBtn, setActiveBtn] = useState("");

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
  }, []);

  const fetchSuggestions = useCallback(
    async (query, signal) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery.length <= 1) {
        setSearchSuggestions([]);
        return;
      }

      const cachedSuggestions = CACHE.get(trimmedQuery);
      if (cachedSuggestions) {
        setSearchSuggestions(cachedSuggestions);
        return;
      }

      try {
        const params = new URLSearchParams({
          lat: lat.toString(),
          lng: lng.toString(),
          str: trimmedQuery,
          trackingId: generateTrackingId(),
          includeIMItem: "true",
        });

        const response = await fetch(
          `${BASE_URL}/restaurants/search/suggest?${params}`,
          {
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const { data } = await response.json();
        const suggestions = data?.suggestions ?? [];

        setSearchSuggestions(suggestions);
        CACHE.set(trimmedQuery, suggestions);
      } catch (error) {
        console.error("Failed to fetch search suggestions:", error.message);
        setSearchSuggestions([]);
      }
    },
    [lat, lng]
  );

  useEffect(() => {
    if (!searchQuery?.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery, abortController.signal);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [searchQuery, fetchSuggestions]);

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
        trackingId: generateTrackingId(),
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

  useEffect(() => {
    fetchDishesFromSearch();
    fetchRestaurantSearchData();
  }, [activeBtn]);

  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto">
      <div className="w-full relative">
        <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-1 absolute top-1/2 -translate-y-1/2"></i>
        <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
        <input
          className="border-2 w-full pl-8 py-3 text-xl focus:outline-none"
          type="text"
          placeholder="Search for restaurant and food"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisible(true);
          }}
        />
      </div>

      {searchQuery.trim() === "" && <Carousel data={popularCuisines} />}

      {searchSuggestions.length > 0 && visible && (
        <div className="my-7 flex flex-col gap-2">
          {searchSuggestions.map((suggestion, i) => (
            <Link
              onClick={() => {
                setSearchQuery(suggestion.text);
                setVisible(false);
                setActiveBtn("Dishes");                
              }}
              key={i}
              href="#"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={`${IMAGE_URL}${suggestion.cloudinaryId}`}
                  alt={suggestion.text}
                  className="object-cover w-full h-full rounded"
                />
              </div>

              <div>
                <p className="text-base font-semibold text-gray-900">
                  {suggestion.text}
                </p>
                <p className="text-sm text-gray-500">{suggestion.type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!selectedResDish && !visible && (
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

export default SearchPage;
