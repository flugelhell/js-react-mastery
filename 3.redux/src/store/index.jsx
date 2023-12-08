import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });
store.dispatch({ type: "counter/increment" });
console.log(store.getState);

export default store;
