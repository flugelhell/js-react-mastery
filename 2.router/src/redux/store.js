import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { fetchInitialState } from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// change init value for theme
await store.dispatch(fetchInitialState());

// on create store
console.log("on create store:", store.getState());
// saat terjadi perubahan pada state
store.subscribe(() => {
  console.log("store change: ", store.getState());
});

export default store;
