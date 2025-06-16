import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slices/toggleSlice";
import cartSlice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";
import restaurantSlice from "./slices/restaurantSlice";
import restaurantMenuSlice from "./slices/restaurantMenuSlice";

const store = configureStore({
  reducer: {
    toggleSlice,
    cartSlice,
    filterSlice,
    authSlice,
    restaurantSlice,
    restaurantMenuSlice,
  },
});

export default store;
