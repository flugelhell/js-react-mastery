import { createSlice } from "@reduxjs/toolkit";

// Slice adalah kumpulan dari redux reducer dan action
const productSlice = createSlice({
  name: "products",
  initialState: { product_db: [], product_show: [] },
  reducers: {
    setProduct: (state, action) => {
      //   let new_state = [...state];
      //   let indexs = new_state.map((x) => x.id);
      //   action.payload.forEach((element) => {
      //     if (!indexs.includes(element.id)) {
      //       new_state.push(element);
      //     }
      //   });
      //   return new_state;
      //   return [...state].concat(action.payload);
      return action.payload;
    },
  },
});

// export action
export const { setProduct } = productSlice.actions;
// export default reducer
export default productSlice.reducer;
