import { useState, useCallback, useEffect } from "react";
import { BASE_URL, CACHE } from "../utils/constants";
import { generateTrackingId } from "../utils/helper";

const useSearchSuggestions = (searchQuery, lat, lng) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

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

  return { searchSuggestions, setSearchSuggestions };
};

export default useSearchSuggestions;
