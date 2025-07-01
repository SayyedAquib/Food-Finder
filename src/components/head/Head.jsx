import { useContext, useState } from "react";
import { Coordinates } from "../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../../redux/slices/toggleSlice";
import { LoginOverlay, Navbar, SearchOverlay } from "../index";
import useSearchAutocomplete from "../../hooks/useSearchAutocomplete";
import usePlaceDetails from "../../hooks/usePlaceDetails";

const Head = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("Pune, Maharashtra, India");

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const { setCoord } = useContext(Coordinates);

  const handleVisibility = () => dispatch(toggleSearchBar());
  const handleLogin = () => dispatch(toggleLogin());

  const searchResult = useSearchAutocomplete(query);

  const { fetchCoordinates } = usePlaceDetails({
    setCoord,
    setAddress,
    handleClose: handleVisibility,
  });

  return (
    <>
      <SearchOverlay
        visible={visible}
        onClose={handleVisibility}
        searchResult={searchResult}
        onSearch={(val) => setQuery(val)}
        onPlaceSelect={fetchCoordinates}
      />

      <LoginOverlay visible={loginVisible} onClose={handleLogin} />

      <Navbar
        address={address}
        onAddressClick={handleVisibility}
        onLoginClick={handleLogin}
      />
    </>
  );
};

export default Head;
