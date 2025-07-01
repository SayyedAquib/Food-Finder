import { BASE_URL, CACHE } from "../utils/constants";

const usePlaceDetails = ({ setCoord, setAddress, handleClose }) => {
  const fetchCoordinates = async (placeId) => {
    const id = placeId?.trim();
    if (!id) return;

    if (CACHE.has(id)) {
      const cached = CACHE.get(id);
      setCoord(cached.coords || { lat: null, lng: null });
      setAddress(cached.address || "");
      handleClose();
      return;
    }

    try {
      handleClose();
      const res = await fetch(
        `${BASE_URL}/misc/address-recommend?place_id=${encodeURIComponent(id)}`
      );
      const data = await res.json();

      const location = data?.data?.[0];
      const coords = location?.geometry?.location;

      setCoord({ lat: coords?.lat, lng: coords?.lng });
      setAddress(location?.formatted_address || "Address not available");
      CACHE.set(id, {
        coords: { lat: coords?.lat, lng: coords?.lng },
        address: location?.formatted_address || "Address not available",
      });
    } catch (e) {
      console.error("Place Details Error:", e);
      setCoord({ lat: null, lng: null });
      setAddress("");
    }
  };

  return { fetchCoordinates };
};

export default usePlaceDetails;
