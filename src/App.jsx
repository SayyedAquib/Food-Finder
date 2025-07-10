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
} from "./components/index";
import Loadable from "./utils/loadable";
import NotFoundPage from "./pages/NotFoundPage";

const HomePage = Loadable(
  lazy(() => import("./pages/HomePage")),
  BodyShimmer
);

const Body = Loadable(
  lazy(() => import("./components/body/Body")),
  BodyShimmer
);

const SearchPage = Loadable(
  lazy(() => import("./pages/SearchPage")),
  SearchShimmer
);

const CartPage = Loadable(
  lazy(() => import("./pages/CartPage")),
  CartShimmer
);

const RestaurantMenuPage = Loadable(
  lazy(() => import("./pages/RestaurantMenuPage")),
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
          <Route path="/" element={<HomePage />}>
            <Route index element={<Body />} />
            <Route path="restaurantMenu/:id" element={<RestaurantMenuPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Coordinates.Provider>
  );
};

export default App;
