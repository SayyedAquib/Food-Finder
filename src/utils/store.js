import { configureStore } from "@reduxjs/toolkit";
import toogleSlice from "./toogleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import restaurantSlice from "./restaurantSlice";

const store = configureStore({
  reducer: {
    toogleSlice,
    cartSlice,
    filterSlice,
    authSlice,
    restaurantSlice,
  },
});

export default store;
