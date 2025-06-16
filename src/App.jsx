import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Coordinates } from "./context/contextApi";
import { lazy } from "react";
import {
  BodyShimmer,
  MenuShimmer,
  CartShimmer,
  SearchShimmer,
} from "./components";
import NotFound from "./pages/NotFound";
import Loadable from "./utils/loadable";

const Home = Loadable(
  lazy(() => import("./pages/Home")),
  BodyShimmer
);
const Body = Loadable(
  lazy(() => import("./components/Body")),
  BodyShimmer
);
const Search = Loadable(
  lazy(() => import("./pages/Search")),
  SearchShimmer
);
const Cart = Loadable(
  lazy(() => import("./pages/Cart")),
  CartShimmer
);
const RestaurantMenu = Loadable(
  lazy(() => import("./pages/RestaurantMenu")),
  MenuShimmer
);

const App = () => {
  const [coord, setCoord] = useState({ lat: 18.5211061, lng: 73.8502 });

  const { searchBarToggle: isSearchOpen, loginToggle: isLoginOpen } =
    useSelector((state) => state.toggleSlice);

  const isOverlayActive = isSearchOpen || isLoginOpen;

  return (
    <Coordinates.Provider value={{ coord, setCoord }}>
      <div className={isOverlayActive ? "max-h-screen overflow-hidden" : ""}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Body />} />
            <Route path="restaurantMenu/:id" element={<RestaurantMenu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Coordinates.Provider>
  );
};

export default App;
