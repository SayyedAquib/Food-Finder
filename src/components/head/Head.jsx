import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Coordinates } from "../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../../redux/slices/toggleSlice";
import { Logo, SigninBtn } from "../index";
import { IMAGE_URL, BASE_URL } from "../../utils/constants";

const Head = () => {
  const navItems = [
    {
      name: "Search",
      image: "fi-rr-search",
      path: "/search",
    },
    {
      name: "Sign in",
      image: "fi-rr-user",
      path: "/signin",
    },
    {
      name: "Cart",
      image: "fi-rr-shopping-cart-add",
      path: "/cart",
    },
  ];

  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);

  //access data from redux store using useSelector
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("Pune, Maharashtra, India");
  const { setCoord } = useContext(Coordinates);

  const handleVisibility = () => {
    dispatch(toggleSearchBar());
  };

  const handleLogin = () => {
    dispatch(toggleLogin());
  };

  const searchResultFun = async (query) => {
    if (!query?.trim()) return;

    try {
      const response = await fetch(
        `${BASE_URL}/misc/place-autocomplete?input=${encodeURIComponent(
          query.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data) {
        setSearchResult(data.data);
      } else {
        console.warn("Unexpected API response structure:", data);
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResult([]);
    }
  };

  const fetchLatAndLng = async (placeId) => {
    if (!placeId?.trim()) return;

    try {
      handleVisibility();

      const response = await fetch(
        `${BASE_URL}/misc/address-recommend?place_id=${encodeURIComponent(
          placeId.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.data?.[0]) {
        throw new Error("Invalid API response: missing location data");
      }

      const locationData = data.data[0];
      const geometry = locationData.geometry?.location;

      if (!geometry?.lat || !geometry?.lng) {
        throw new Error("Invalid coordinates in API response");
      }

      const coordinates = {
        lat: geometry.lat,
        lng: geometry.lng,
      };

      const formattedAddress = locationData.formatted_address;

      if (!formattedAddress) {
        console.warn("No formatted address found for place ID:", placeId);
      }

      setCoord(coordinates);
      setAddress(formattedAddress || "Address not available");
    } catch (error) {
      console.error("Error fetching location details:", error);

      setCoord({ lat: null, lng: null });
      setAddress("");
    }
  };

  return (
    <>
      {/* Overlay for Search */}
      <div className="w-full">
        <div
          onClick={handleVisibility}
          className={`w-full h-full fixed inset-0 bg-black/50 z-30 transition-opacity ${
            visible ? "visible opacity-100" : "invisible opacity-0"
          }`}
        />
        <div
          className={`bg-white fixed top-0 left-0 h-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] z-40 p-5 transition-transform duration-500 ${
            visible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-4 mt-3 w-full mr-6">
            <i
              className="fi fi-br-cross cursor-pointer"
              onClick={handleVisibility}
            ></i>
            <input
              type="text"
              className="border p-4 w-full rounded-md focus:outline-none focus:shadow-lg"
              onChange={(e) => searchResultFun(e.target.value)}
              placeholder="Search for area, street name..."
            />
            <div className="overflow-auto max-h-[70vh]">
              <ul>
                {searchResult.map((data, index) => {
                  const isLast = index === searchResult.length - 1;
                  return (
                    <div className="my-5 cursor-pointer" key={index}>
                      <div className="flex gap-4">
                        <i className="fi mt-1 fi-rr-marker"></i>
                        <li onClick={() => fetchLatAndLng(data.place_id)}>
                          {data.structured_formatting.main_text}
                          <p className="text-sm opacity-65">
                            {data.structured_formatting.secondary_text}
                          </p>
                          {!isLast && (
                            <hr className="my-2 border-gray-300 border-dashed" />
                          )}
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Login */}
      <div className="w-full">
        <div
          onClick={handleLogin}
          className={`w-full h-full fixed inset-0 bg-black/50 z-30 transition-opacity ${
            loginVisible ? "visible opacity-100" : "invisible opacity-0"
          }`}
        />
        <div
          className={`bg-white fixed top-0 right-0 h-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] z-40 p-5 transition-transform duration-500 ${
            loginVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="m-3 w-full lg:w-[60%]">
            <i className="fi fi-br-cross" onClick={handleLogin}></i>
            <div className="my-10 w-full flex justify-between items-center">
              <h2 className="font-bold text-3xl sm:text-4xl border-b-2 border-black pb-3 sm:pb-5">
                Login
              </h2>
              <img
                className="w-24 sm:w-28"
                src={`${IMAGE_URL}fl_lossy,f_auto,q_auto/Image-login_btpq7r`}
                alt="LOGIN"
              />
            </div>

            <SigninBtn />
            <p className="text-sm mt-2 opacity-70">
              By clicking on Login, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative w-full">
        <div className="w-full sticky bg-white z-20 top-0 shadow-md h-20 sm:h-24 flex justify-center items-center">
          <div className="w-[95%] sm:w-[90%] lg:w-[80%] flex justify-between items-center">
            {/* Logo & Address */}
            <div className="flex items-center gap-4">
              <Logo />
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleVisibility}
              >
                <p className="flex items-center gap-1 text-sm sm:text-base">
                  <span className="font-bold border-b-2 border-black">
                    others
                  </span>
                  <span className="hidden md:block ml-2 max-w-[150px] sm:max-w-[250px] opacity-85 line-clamp-1">
                    {address}
                  </span>
                </p>
                <i className="fi text-xl sm:text-2xl text-orange-500 fi-rs-angle-small-down"></i>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-14">
              {navItems.map((data, i) =>
                data.name === "Sign in" ? (
                  <div
                    onClick={handleLogin}
                    key={data.path}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {userData ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={userData.photo}
                          alt="User Avatar"
                        />
                      ) : (
                        <i
                          className={`fi text-xl text-gray-700 ${data.image}`}
                        ></i>
                      )}
                      <p className="text-base font-medium text-gray-700">
                        {userData ? userData.name : data.name}
                      </p>
                      {data.name === "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </div>
                ) : (
                  <Link to={data.path} key={data.path}>
                    <div className="flex items-center gap-3">
                      <i
                        className={`fi text-xl text-gray-700 ${data.image}`}
                      ></i>
                      <p className="text-base font-medium text-gray-700">
                        {data.name}
                      </p>
                      {data.name === "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </Link>
                )
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-4 sm:gap-10">
              {navItems.map((data, i) =>
                data.name === "Sign in" ? (
                  <div onClick={handleLogin} key={data.path}>
                    <div className="flex items-center gap-2">
                      {userData ? (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={userData.photo}
                          alt="User"
                        />
                      ) : (
                        <i
                          className={`fi text-xl text-gray-700 ${data.image}`}
                        ></i>
                      )}
                      <p className="hidden md:block text-sm font-medium text-gray-700 line-clamp-1">
                        {userData ? userData.name : data.name}
                      </p>
                      {data.name === "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </div>
                ) : (
                  <Link to={data.path} key={data.path}>
                    <i className={`fi text-xl text-gray-700 ${data.image}`} />
                    {data.name === "Cart" && (
                      <sup className="text-lg ">{cartData.length}</sup>
                    )}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
