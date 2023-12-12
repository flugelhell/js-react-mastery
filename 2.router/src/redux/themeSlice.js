import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadStateFromIndexedDB, saveStateToIndexedDB } from "./indexedDBUtils";

export const fetchInitialState = createAsyncThunk("theme/changeTheme", async () => {
  let theme = await loadStateFromIndexedDB("theme/changeTheme").then((res) => {
    return res ? res : "light"; // default themes
  });
  return theme;
});

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    changeTheme: (state, action) => {
      saveStateToIndexedDB("theme/changeTheme", action.payload);
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

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
