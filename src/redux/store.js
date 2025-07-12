import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slices/toggleSlice";
import cartSlice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";
import restaurantSlice from "./slices/restaurantSlice";
import menuSlice from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    toggleSlice,
    cartSlice,
    filterSlice,
    authSlice,
    restaurantSlice,
    menuSlice,
  },
});

export default store;
