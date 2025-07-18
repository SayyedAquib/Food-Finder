import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topRestaurantData: [],
  topRestaurantTitle: "",
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
      const {
        topRestaurantData,
        topRestaurantTitle,
        onlineTitle,
        onYourMindData,
        data,
      } = action.payload;
      state.status = "succeeded";
      state.topRestaurantData = topRestaurantData;
      state.topRestaurantTitle = topRestaurantTitle;
      state.onlineTitle = onlineTitle;
      state.onYourMindData = onYourMindData;
      state.data = data;
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
