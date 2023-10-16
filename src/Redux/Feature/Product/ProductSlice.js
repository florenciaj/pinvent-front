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
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],
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

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, thunkAPI) => {
        try {
            return await ProductService.deleteProduct(id);
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
            const products = action.payload;
            const storeProducts = [];
            products.map(item => {
                const { price, amount } = item;
                const productValue = price * amount;
                return storeProducts.push(productValue);
            });
            const totalValue = storeProducts.reduce((a, b) => {
                return a + b;
            }, 0);
            state.totalStoreValue = totalValue;
        },
        CALCULATE_OUT_OF_STOCK(state, action) {
            const products = action.payload;
            const storeProducts = [];
            products.map(item => {
                const { amount } = item;
                return storeProducts.push(amount);
            });
            let count = 0;
            storeProducts.forEach(number => {
                if (number == 0) {
                    count++;
                }
            });
            state.outOfStock = count;
        },
        CALCULATE_CATEGORY(state, action) {
            const products = action.payload;
            const storeProducts = [];
            products.map(item => {
                const { category } = item;
                return storeProducts.push(category);
            });
            let uniqueCategory = [...new Set(storeProducts)];
            state.category = uniqueCategory.length;
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
            .addCase(deleteProduct.pending, (state) => { state.isLoading = true; })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Product deleted')
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});

export const { CALCULATE_STORE_VALUE, CALCULATE_OUT_OF_STOCK, CALCULATE_CATEGORY } = ProductSlice.actions

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;

export default ProductSlice.reducer