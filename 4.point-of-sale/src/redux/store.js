import { configureStore } from "@reduxjs/toolkit";
import posConfigReducer, { fetchInitialState as posconfigInit } from "./posConfigSlice";
import productReducer from "./productSlice";
import CategorySlice from "./CategorySlice";

const store = configureStore({
  reducer: {
    posConfig: posConfigReducer,
    products: productReducer,
    categories: CategorySlice,
  },
});

// change init value for theme
await store.dispatch(posconfigInit());

// on create store
console.log("on create store:", store.getState());
// saat terjadi perubahan pada state
store.subscribe(() => {
  console.log("store change: ", store.getState());
});

export default store;
