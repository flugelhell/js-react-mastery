import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadStateFromIndexedDB, saveStateToIndexedDB } from "./indexedDBUtils";

// contoh data order
// order =
//     {
//         id:1,
//         order_lines:[
//             {product_id:123}
//         ]
//     }

const initialState = {
  order_id: 1,
  order_lines: [
    {
      product_id: 1,
      product_name: "abcd",
      price: 1000,
      qty: 1,
      disc: 0,
      total: 1000,
    },
    {
      product_id: 2,
      product_name: "abcde",
      price: 1000,
      qty: 1,
      disc: 0,
      total: 1000,
    },
  ],
};
export const fetchInitialState = createAsyncThunk("order/addProductToOrder", async () => {
  let order = await loadStateFromIndexedDB("order/addProductToOrder").then((res) => {
    return res ? res : initialState;
  });
  return order;
});

// Slice adalah kumpulan dari redux reducer dan action
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrder: (state, action) => {
      saveStateToIndexedDB("order/addProductToOrder", action.payload);
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchInitialState.fulfilled, (state, action) => {
      // Add user to the state array
      return action.payload;
    });
  },
});

// export action
export const { setOrder } = orderSlice.actions;
// export default reducer
export default orderSlice.reducer;
