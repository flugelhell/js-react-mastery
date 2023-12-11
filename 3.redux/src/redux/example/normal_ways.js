import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction("ADD_TO_CART");

const cartReducer = createReducer([], (builder) => {
  builder.addCase(addToCart, (state, action) => {
    state = [...state, action.payload];
  });
});

const login = createAction("ADD_TO_CART");
const loginReducer = createReducer({ status: false }, (builder) => {
  builder.addCase(login, (state, action) => {
    state.status = true;
  });
});

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});

console.log("oncreate store:", store.getState());
store.subscribe(() => {
  console.log("STORE CHANGE: ", store.getState());
});

store.dispatch(addToCart({ id: 1, qty: 20 }));
store.dispatch(addToCart({ id: 2, qty: 10 }));
store.dispatch(login());

export default store;
