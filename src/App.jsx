import { Routes, Route } from "react-router-dom";
import { Coordinates } from "./context/contextApi";
import { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import {
  CartShimmer,
  MenuShimmer,
  NotFound,
  SearchShimmer,
  Shimmer,
} from "./components/index";

const Head = lazy(() => import("./components/Head"));
const Body = lazy(() => import("./components/Body"));
const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));

const App = () => {
  const [coord, setCoord] = useState({ lat: 28.5355161, lng: 77.3910265 });

  const visible = useSelector((state) => state.toogleSlice.searchBarToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToggle);

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
              <Suspense fallback={<Shimmer />}>
                <Head />
              </Suspense>
            }
          >
            <Route
              path="/"
              element={
                <Suspense fallback={<Shimmer />}>
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
