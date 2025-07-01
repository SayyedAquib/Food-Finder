import { useState, useCallback } from "react";
import { BASE_URL, CACHE } from "../utils/constants";
import { generateTrackingId } from "../utils/helper";
import useDebounce from "./useDebounce";

const useSearchSuggestions = (searchQuery, lat, lng) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    async (signal) => {
      const trimmedQuery = searchQuery?.trim();
      if (!trimmedQuery || trimmedQuery.length <= 1) {
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
          { signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const { data } = await response.json();
        const suggestions = data?.suggestions ?? [];

        setSearchSuggestions(suggestions);
        CACHE.set(trimmedQuery, suggestions);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch search suggestions:", error.message);
        }
        setSearchSuggestions([]);
      }
    },
    [searchQuery, lat, lng]
  );

  useDebounce(fetchSuggestions, [searchQuery, lat, lng], 300);

  return { searchSuggestions, setSearchSuggestions };
};

export default useSearchSuggestions;
