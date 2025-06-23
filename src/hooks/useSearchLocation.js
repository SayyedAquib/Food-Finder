import { BASE_URL } from "../utils/constants";

const useSearchLocation = ({
  setSearchResult,
  setAddress,
  setCoord,
  handleVisibility,
}) => {
  const searchResultFun = async (query) => {
    if (!query?.trim()) return;
    try {
      const res = await fetch(
        `${BASE_URL}/misc/place-autocomplete?input=${encodeURIComponent(
          query.trim()
        )}`
      );
      const data = await res.json();
      setSearchResult(data?.data || []);
    } catch (e) {
      console.error("Search error", e);
      setSearchResult([]);
    }
  };

  const fetchLatAndLng = async (placeId) => {
    if (!placeId?.trim()) return;
    try {
      handleVisibility();
      const res = await fetch(
        `${BASE_URL}/misc/address-recommend?place_id=${encodeURIComponent(
          placeId.trim()
        )}`
      );
      const data = await res.json();

      const location = data?.data?.[0];
      const coords = location?.geometry?.location;
      setCoord({ lat: coords?.lat, lng: coords?.lng });
      setAddress(location?.formatted_address || "Address not available");
    } catch (e) {
      console.error("Location error", e);
      setCoord({ lat: null, lng: null });
      setAddress("");
    }
  };

  return { searchResultFun, fetchLatAndLng };
};

export default useSearchLocation;
