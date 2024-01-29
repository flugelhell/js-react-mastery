import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
// // change init value for posconfig
// await store.dispatch(posconfigInit());
// // change init value for order
// await store.dispatch(initOrder());

// on create store
console.log("on create store:", store.getState());
// saat terjadi perubahan pada state
store.subscribe(() => {
    console.log("store change: ", store.getState());
});

export default store;
