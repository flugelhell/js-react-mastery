import { configureStore } from "@reduxjs/toolkit";
// untuk monitor state menggunakan useSelector dari react-redux
// untuk update state menggunakan useDispatch dari react-redux

// Initial state for reducer
const initialState = { counter: 0, username: "" };
// create reducer
function globalStateReducer(state = initialState, action) {
  switch (action.type) {
    case "counter/increment":
      return {
        ...state, // copy state dengan destructuring
        counter: state.counter + 1, // ubah value didalam state
      };
    case "counter/decrement":
      return {
        ...state,
        counter: state.counter - 1,
      };
    case "counter/reset":
      return {
        ...state,
        counter: 0,
      };
    case "username/setUsername":
      console.log(action);
      return {
        ...state,
        username: action.payload,
      };
  }
  return state;
}

// create store
const store = configureStore({ reducer: globalStateReducer });
console.log("globalStore Created: ", store.getState());
store.subscribe(() => {
  console.log("globalStore Changed; ", store.getState());
});

export default store;
