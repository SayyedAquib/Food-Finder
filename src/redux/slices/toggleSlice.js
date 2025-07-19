import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBarToggle: false,
  loginToggle: false,
  isDiffRes: false,
  similarResDish: {
    isSimilarResDishes: false,
    city: "",
    resLocation: "",
    resId: "",
    itemId: "",
  },
};

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleLogin: (state) => {
      state.loginToggle = !state.loginToggle;
    },
    toggleIsDifferrentRestaurant: (state) => {
      state.isDiffRes = !state.isDiffRes;
    },
    setSimilarRestaurantDish: (state, action) => {
      state.similarResDish = action.payload;
    },
    resetSimilarRestaurantDish: (state) => {
      state.similarResDish = {
        isSimilarResDishes: false,
        city: "",
        resLocation: "",
        resId: "",
        itemId: "",
      };
    },
  },
});

export const {
  toggleSearchBar,
  toggleLogin,
  toggleIsDifferentRestaurant,
  setSimilarRestaurantDish,
  resetSimilarRestaurantDish,
} = toggleSlice.actions;

export default toggleSlice.reducer;
