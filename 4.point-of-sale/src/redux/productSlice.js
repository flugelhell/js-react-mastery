import { createSlice } from "@reduxjs/toolkit";

// Slice adalah kumpulan dari redux reducer dan action
const productSlice = createSlice({
  name: "products",
  initialState: { product_db: [], product_show: [] },
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
  },
});

// export action
export const { setProduct } = productSlice.actions;
// export default reducer
export default productSlice.reducer;
