import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topRestaurantData: [],
  topResTitle: "",
  onlineTitle: "",
  onYourMindData: [],
  data: {},
  status: "idle",
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.topRestaurantData = action.payload.topRestaurantData;
      state.topResTitle = action.payload.topResTitle;
      state.onlineTitle = action.payload.onlineTitle;
      state.onYourMindData = action.payload.onYourMindData;
      state.data = action.payload.data;
    },
    fetchFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
