import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Feature/Auth/Auth";
import FilterSlice from "./Feature/Product/FilterSlice";
import ProductSlice from "./Feature/Product/ProductSlice";

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        product: ProductSlice,
        filter: FilterSlice,
    }
});