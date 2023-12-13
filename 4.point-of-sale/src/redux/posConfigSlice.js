import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadStateFromIndexedDB, saveStateToIndexedDB } from "./indexedDBUtils";

// get initial state
export const fetchInitialState = createAsyncThunk("posConfig", async () => {
  let state = await loadStateFromIndexedDB("posConfig").then((res) => {
    return res ? res : { kasir: "nama_kasir", pos_id: "pos_id" };
  });
  return state;
});

// Slice adalah kumpulan dari redux reducer dan action
const posConfigSlice = createSlice({
  name: "posConfig",
  initialState: {
    kasir: "nama_kasir",
    pos_id: "pos_id",
  },
  reducers: {
    setKasir: (state, action) => {
      state.kasir = action.payload.kasir;
      saveStateToIndexedDB("posConfig", state);
    },
    setPosId: (state, action) => {
      state.pos_id = action.payload.pos_id;
      saveStateToIndexedDB("posConfig", state);
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
export const { setKasir, setPosId } = posConfigSlice.actions;
// export default reducer
export default posConfigSlice.reducer;
