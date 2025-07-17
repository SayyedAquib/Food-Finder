import { useContext, useState } from "react";
import { Coordinates } from "../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../../redux/slices/toggleSlice";
import { LoginOverlay, Navbar, SearchOverlay } from "../index";
import { usePlaceDetails, useSearchAutocomplete } from "../../hooks";

const Head = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("Pune, Maharashtra, India");

  const { setCoord } = useContext(Coordinates);

  const isSearchOpen = useSelector(
    (state) => state.toggleSlice.searchBarToggle
  );
  const isLoginOpen = useSelector((state) => state.toggleSlice.loginToggle);

  const toggleSearch = () => dispatch(toggleSearchBar());
  const toggleLogin = () => dispatch(toggleLogin());

  const { results, setResults } = useSearchAutocomplete(query);

  const handlePlaceSelect = async (placeId) => {
    await fetchCoordinates(placeId);
    setQuery("");
    setResults([]);
  };

  const { fetchCoordinates } = usePlaceDetails({
    setCoord,
    setAddress,
    handleClose: toggleSearch,
  });

  return (
    <>
      <SearchOverlay
        visible={isSearchOpen}
        onClose={toggleSearch}
        searchResult={results}
        onSearch={setQuery}
        onPlaceSelect={handlePlaceSelect}
        query={query}
      />

      <LoginOverlay visible={isLoginOpen} onClose={toggleLogin} />

      <Navbar
        address={address}
        onAddressClick={toggleSearch}
        onLoginClick={toggleLogin}
      />
    </>
  );
};

export default Head;
