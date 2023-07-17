import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Feature/Auth/Auth";

export const Store = configureStore({
    reducer: {
        auth: authReducer
    }
});