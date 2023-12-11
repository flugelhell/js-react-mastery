import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    incrementCounter: (state, action) => {
      return state + 1;
    },
    decrementCounter: (state, action) => {
      return state - 1;
    },
    resetCounter: (state, action) => {
      return 0;
    },
  },
});

export const { incrementCounter, decrementCounter, resetCounter } = counterSlice.actions;
export default counterSlice.reducer;
