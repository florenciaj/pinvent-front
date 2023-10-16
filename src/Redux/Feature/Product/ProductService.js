import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/product`;

export const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
}

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

const ProductService = {
    createProduct,
    getProducts,
    deleteProduct
}

export default ProductService;