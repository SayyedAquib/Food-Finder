import { Routes, Route } from "react-router-dom";
import { Coordinates } from "./context/contextApi";
import { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import {
  BodyShimmer,
  MenuShimmer,
  CartShimmer,
  SearchShimmer,
} from "./components";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Body = lazy(() => import("./components/Body"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu"));

const App = () => {
  const [coord, setCoord] = useState({ lat: 18.5211061, lng: 73.8502 });

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);

  return (
    <Coordinates.Provider value={{ coord, setCoord }}>
      <div
        className={
          " " + (visible || loginVisible ? "max-h-screen overflow-hidden" : " ")
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<BodyShimmer />}>
                <Home />
              </Suspense>
            }
          >
            <Route
              path="/"
              element={
                <Suspense fallback={<BodyShimmer />}>
                  <Body />
                </Suspense>
              }
            />
            <Route
              path="/restaurantMenu/:id"
              element={
                <Suspense fallback={<MenuShimmer />}>
                  <RestaurantMenu />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<CartShimmer />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/search"
              element={
                <Suspense fallback={<SearchShimmer />}>
                  <Search />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Coordinates.Provider>
  );
};

export default App;
