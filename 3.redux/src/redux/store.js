import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

console.log("on create store:", store.getState());

store.subscribe(() => {
  console.log("store change: ", store.getState());
});

export default store;
