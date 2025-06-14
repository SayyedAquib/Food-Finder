import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topRestaurantData: [],
  topResTitle: "",
  onlineTitle: "",
  onYourMindData: [],
  data: {},
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    restaurantData: (state, action) => {
      state.topRestaurantData = action.payload.topRestaurantData || [];
      state.topResTitle = action.payload.topResTitle || "";
      state.onlineTitle = action.payload.onlineTitle || "";
      state.onYourMindData = action.payload.onYourMindData || [];
      state.data = action.payload.data || {};
    },
  },
});

export const { restaurantData } = restaurantSlice.actions;
export default restaurantSlice.reducer;
