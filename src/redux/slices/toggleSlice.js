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
    toggleIsDifferrentRes: (state) => {
      state.isDiffRes = !state.isDiffRes;
    },
    setSimilarResDish: (state, action) => {
      state.similarResDish = action.payload;
    },
    resetSimilarResDish: (state) => {
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
  setSimilarResDish,
  resetSimilarResDish,
} = toggleSlice.actions;

export default toggleSlice.reducer;
