import { createSlice } from "@reduxjs/toolkit";

const initialCarListState = {
  loading: false,
  cars: [
    {
      _id: "hyundai",
      logoUrl: require("../assets/logo/hyundai.png"),
    },
    {
      _id: "honda",
      logoUrl: require("../assets/logo/honda.png"),
    },
    {
      _id: "maruti-suzuki",
      logoUrl: require("../assets/logo/suzuki.png"),
    },
  ],
};

const carListSlice = createSlice({
  name: "brand",
  initialState: initialCarListState,
  reducers: {
    replaceCarListData(state, action) {
      state.cars = action.payload;
    },
    setCarListLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const carListActions = carListSlice.actions;

export default carListSlice;
