import { useState } from "react";

import { configureStore } from "@reduxjs/toolkit";

const initialState = { value: 0 };
function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === "counter/increment") {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    };
  }
  // otherwise return the existing state unchanged
  return state;
}

const store = configureStore({ reducer: counterReducer });

store.dispatch({ type: "counter/increment" });
console.log(store.getState());

function App() {
  const increment = () => {
    store.dispatch({ type: "counter/increment" });
  };

  return (
    <>
      <div className="flex">
        <img src={`/react.svg`} className="block mx-auto h-24 m-4" alt="React logo" />
      </div>
      <div className="flex-1">
        <h1 className="text-center text-2xl font-extrabold m-4">React Redux</h1>
        <button className="block mx-auto bg-slate-500 p-2 text-slate-200 hover:bg-slate-600 active:bg-slate-800 rounded" onClick={() => increment}>
          {/* count is {count} */}
        </button>
      </div>
    </>
  );
}

export default App;
