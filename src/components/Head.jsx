import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toogleSearchBar } from "../utils/toogleSlice";
import { SigninBtn } from "./index";

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

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);

  //access data from redux store using useSelector
  const visible = useSelector((state) => state.toogleSlice.searchBarToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToggle);
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("");
  const { setCoord } = useContext(Coordinates);

  const handleVisibility = () => {
    dispatch(toogleSearchBar());
  };

  const handleLogin = () => {
    dispatch(toggleLogin());
  };

  const searchResultFun = async (query) => {
    if (!query?.trim()) return;

    try {
      const response = await fetch(
        `${baseUrl}/misc/place-autocomplete?input=${encodeURIComponent(
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
        `${baseUrl}/misc/address-recommend?place_id=${encodeURIComponent(
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
      <div className="w-full">
        <div
          onClick={handleVisibility}
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (visible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex justify-end  w-full md:w-[40%] h-full p-5 z-40 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="flex flex-col gap-4 mt-3 w-full lg-[50%] mr-6">
            <i
              className="fi fi-br-cross cursor-pointer"
              onClick={handleVisibility}
            ></i>
            <input
              type="text"
              className="border p-5 focus:outline-none focus:shadow-lg"
              onChange={(e) => searchResultFun(e.target.value)}
              placeholder="Search for area, street name..."
            />
            <div className="p-5 ">
              <ul>
                {searchResult.map((data, index) => {
                  const isLast = index === searchResult.length - 1;
                  return (
                    <div className="my-5" key={index}>
                      <div className="flex gap-4">
                        <i className="fi mt-1 fi-rr-marker"></i>
                        <li onClick={() => fetchLatAndLng(data.place_id)}>
                          {data.structured_formatting.main_text}
                          <p className="text-sm opacity-65">
                            {data.structured_formatting.secondary_text}
                          </p>
                          {!isLast && (
                            <p className="opacity-35">
                              ---------------------------------------------
                            </p>
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

      <div className="w-full">
        <div
          onClick={handleLogin}
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (loginVisible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex   w-full md:w-[40%] h-full p-5 z-40 fixed duration-500 " +
            (loginVisible ? "right-0" : "-right-[100%]")
          }
        >
          <div className=" m-3 w-full lg:w-[60%] ">
            <i className="fi fi-br-cross" onClick={handleLogin}></i>
            <div className="my-10 w-full flex justify-between items-center">
              <h2 className="font-bold text-4xl border-b-2 border-black pb-5 ">
                Login
              </h2>
              <img
                className="w-28"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
              />
            </div>

            <SigninBtn />
            <p className="text-base mt-2 opacity-70">
              By clicking on Login, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full ">
        <div className="w-full sticky bg-white z-20 top-0 shadow-md h-24 flex justify-center items-center">
          <div className="w-full sm:w-[90%] lg:w-[80%]  flex justify-between">
            <div className="flex items-center">
              <Link to={"/"}>
                <div className="w-20">
                  <img
                    src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                    alt=""
                  />
                </div>
              </Link>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleVisibility}
              >
                <p className="flex items-center">
                  <span className="font-bold border-b-2  border-black">
                    others
                  </span>
                  <span className="ml-2 max-w-[250px] text-sm opacity-85 line-clamp-1">
                    {address}
                  </span>
                </p>
                <i className="fi text-2xl mt-2 text-orange-500 fi-rs-angle-small-down"></i>
              </div>
            </div>

            <div className=" hidden md:flex items-center gap-2 md:gap-14">
              {navItems.map((data, i) =>
                data.name == "Sign in" ? (
                  <div
                    onClick={handleLogin}
                    key={data.path}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3" key={i}>
                      {userData ? (
                        <div className="w-10 h-10 rounded-full ">
                          <img
                            className="rounded-full"
                            src={userData.photo}
                            alt=""
                          />
                        </div>
                      ) : (
                        <i
                          className={
                            "mt-1 fi text-xl text-gray-700 " + data.image
                          }
                        ></i>
                      )}
                      <p className="text-lg font-medium text-gray-700">
                        {userData ? userData.name : data.name}
                      </p>

                      {data.name === "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </div>
                ) : (
                  <Link to={data.path} key={data.path}>
                    <div className="flex items-center gap-3" key={i}>
                      <i
                        className={
                          "mt-1 fi text-xl text-gray-700 " + data.image
                        }
                      ></i>
                      <p className="text-lg font-medium text-gray-700">
                        {data.name}
                      </p>

                      {data.name === "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </Link>
                )
              )}
            </div>

            <div className=" flex items-center md:hidden gap-10 mr-4">
              {navItems.map((data, i) =>
                data.name == "Sign in" ? (
                  <div onClick={handleLogin} key={data.path}>
                    <div className="flex items-center gap-3" key={i}>
                      {userData ? (
                        <div className="w-10 h-10 rounded-full ">
                          <img src={userData.photo} alt="" />
                        </div>
                      ) : (
                        <i
                          className={
                            "mt-1 fi text-xl text-gray-700 " + data.image
                          }
                        ></i>
                      )}
                      <p className="text-lg font-medium text-gray-700 line-clamp-1">
                        {userData ? userData.name : data.name}
                      </p>

                      {data.name === "Cart" && <p>{cartData.length}</p>}
                    </div>
                  </div>
                ) : (
                  <Link to={data.path} key={data.path}>
                    <i
                      className={"mt-1 fi text-xl text-gray-700 " + data.image}
                    ></i>
                    {data.name == "Cart" && (
                      <sup className="">{cartData.length}</sup>
                    )}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default Head;
