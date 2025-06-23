import { useContext, useState } from "react";
import { Coordinates } from "../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../../redux/slices/toggleSlice";
import useSearchLocation from "../../hooks/useSearchLocation";
import { LoginOverlay, Navbar, SearchOverlay } from "../index";

const Head = () => {
  const [address, setAddress] = useState("Pune, Maharashtra, India");
  const [searchResult, setSearchResult] = useState([]);

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const dispatch = useDispatch();
  const { setCoord } = useContext(Coordinates);

  const handleVisibility = () => dispatch(toggleSearchBar());
  const handleLogin = () => dispatch(toggleLogin());

  const { searchResultFun, fetchLatAndLng } = useSearchLocation({
    setSearchResult,
    setAddress,
    setCoord,
    handleVisibility,
  });

  return (
    <>
      <SearchOverlay
        visible={visible}
        onClose={handleVisibility}
        onSearch={searchResultFun}
        searchResult={searchResult}
        onPlaceSelect={fetchLatAndLng}
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
