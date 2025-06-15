import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resInfo: {},
  menuData: [],
  discountData: [],
  topPicksData: null,
};

const restaurantMenuSlice = createSlice({
  name: "restaurantMenu",
  initialState,
  reducers: {
    setMenuData: (state, action) => {
      const { resInfo, menuData, discountData, topPicksData } = action.payload;
      state.resInfo = resInfo || {};
      state.menuData = menuData || [];
      state.discountData = discountData || [];
      state.topPicksData = topPicksData || [];
    },
  },
});

export const { setMenuData } = restaurantMenuSlice.actions;
export default restaurantMenuSlice.reducer;
