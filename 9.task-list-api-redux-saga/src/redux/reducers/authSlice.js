import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    isLoading: false,
    error: null,
    message: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        doAuth: (state, action) => {
            console.log("1. doAuth triggered");
            console.log("2. doAuth payload: ", action.payload);
            return { ...state, isLoading: true };
        },
        authSuccess: (state, action) => {
            console.log("authSuccess");
            return { isAuth: true, isLoading: false, error: action.payload?.error, message: action.payload?.message };
        },
        authFailed: (state, action) => {
            console.log("authFailed");
            return { isAuth: false, isLoading: false, error: action.payload?.error, message: action.payload?.message };
        },
        clearMessage: (state, action) => {
            console.log("clearMessage");
            return { ...state, error: null, message: null };
        },
    },
});

// export action
export const { doAuth, authSuccess, authFailed, clearMessage } = authSlice.actions;
// export default reducer
export default authSlice.reducer;
