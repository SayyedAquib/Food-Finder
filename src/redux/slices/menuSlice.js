import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resInfo: {},
  menuData: [],
  discountData: [],
  topPicksData: null,
  status: "idle",
  error: null,
};

const menuSlice = createSlice({
  name: "restaurantMenu",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      const { resInfo, menuData, discountData, topPicksData } =
        action.payload;
      state.status = "succeeded";
      state.resInfo = resInfo || {};
      state.menuData = menuData || [];
      state.discountData = discountData || [];
      state.topPicksData = topPicksData || [];
    },
    fetchFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = menuSlice.actions;
export default menuSlice.reducer;
