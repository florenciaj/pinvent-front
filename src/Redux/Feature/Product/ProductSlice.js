import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ProductService from './ProductService';

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createNewProduct = createAsyncThunk(
    "product/create",
    async (formData, thunkAPI) => {
        try {
            return await ProductService.createProduct(formData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getProducts = createAsyncThunk(
    "product/getAll",
    async (_, thunkAPI) => {
        try {
            return await ProductService.getProducts();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALCULATE_STORE_VALUE(state, action) {
            console.log('store value');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewProduct.pending, (state) => { state.isLoading = true; })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products.push(action.payload);
                toast.success('Product added successfully');
            })
            .addCase(createNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getProducts.pending, (state) => { state.isLoading = true; })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});

export const { CALCULATE_STORE_VALUE } = ProductSlice.actions

export const selectIsLoading = (state) => state.product.isLoading;

export default ProductSlice.reducer