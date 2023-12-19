import { configureStore } from "@reduxjs/toolkit";
import posConfigReducer, { fetchInitialState as posconfigInit } from "./posConfigSlice";
import productReducer from "./productSlice";
import categorySlice from "./CategorySlice";
import orderSlice, { fetchInitialState as initOrder } from "./orderSlice";

const store = configureStore({
  reducer: {
    posConfig: posConfigReducer,
    products: productReducer,
    categories: categorySlice,
    order: orderSlice,
  },
});

// change init value for posconfig
await store.dispatch(posconfigInit());
// change init value for order
await store.dispatch(initOrder());

// on create store
console.log("on create store:", store.getState());
// saat terjadi perubahan pada state
store.subscribe(() => {
  console.log("store change: ", store.getState());
});

export default store;
