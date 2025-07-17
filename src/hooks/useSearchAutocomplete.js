import { useState } from "react";
import { BASE_URL, CACHE } from "../utils/constants";
import { useDebounce } from "./index";

const useSearchAutocomplete = (query) => {
  const [results, setResults] = useState([]);

  const fetchSuggestions = async (signal) => {
    const trimmedQuery = query?.trim();
    if (!trimmedQuery) return;

    if (CACHE.has(trimmedQuery)) {
      setResults(CACHE.get(trimmedQuery));
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/misc/place-autocomplete?input=${encodeURIComponent(
          trimmedQuery
        )}`,
        { signal }
      );
      const data = await res.json();
      setResults(data?.data || []);
      CACHE.set(trimmedQuery, data?.data);
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("Autocomplete Error:", e);
        setResults([]);
      }
    }
  };

  useDebounce(fetchSuggestions, [query]);

  return { results, setResults };
};

export default useSearchAutocomplete;
