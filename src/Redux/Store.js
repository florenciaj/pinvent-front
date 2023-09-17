import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Feature/Auth/Auth";
import ProductSlice from "./Feature/Product/ProductSlice";

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        product: ProductSlice,
    }
});