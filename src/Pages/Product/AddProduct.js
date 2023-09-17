import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Component/Loader/Loader';
import ProductForm from '../../Component/Product/ProductForm/ProductForm';
import { createProduct } from '../../Redux/Feature/Product/ProductService';
import { selectIsLoading } from '../../Redux/Feature/Product/ProductSlice';

const initialState = {
    name: '',
    category: '',
    amount: '',
    price: ''
};

const AddProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState(initialState);
    const [productPhoto, setProductPhoto] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [productDescription, setProductDescription] = useState('');

    const isLoading = useSelector(selectIsLoading);

    const { name, category, amount, price } = product;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handlePhotoChange = (e) => {
        setProductPhoto(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    };

    const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = `${letter} - ${number}`;
        return sku;
    };

    const saveProduct = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('sku', generateSKU(category));
        formData.append('category', category);
        formData.append('amount', amount);
        formData.append('price', price);
        formData.append('description', productDescription);
        formData.append('photo', productPhoto);

        try {
            dispatch(await createProduct(formData));
            toast.success('Product created successfully');
        } catch (error) {
            toast.error('An error occurred while creating the product');
        }

        navigate('/dashboard');
        return null;
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Create new product</h3>
            <ProductForm
                product={product}
                productPhoto={productPhoto}
                photoPreview={photoPreview}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
                handleInputChange={handleInputChange}
                handlePhotoChange={handlePhotoChange}
                saveProduct={saveProduct}
            ></ProductForm>
        </div>
    )
}

export default AddProduct