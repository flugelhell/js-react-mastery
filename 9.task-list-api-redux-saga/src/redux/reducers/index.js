// rootReducer
import { combineSlices, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    // Add more slices here if needed
});

export default rootReducer;
