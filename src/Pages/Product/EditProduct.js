import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Component/Loader/Loader';
import ProductForm from '../../Component/Product/ProductForm/ProductForm';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../Redux/Feature/Product/ProductSlice';

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);

    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    const [productPhoto, setProductPhoto] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [productDescription, setProductDescription] = useState('');


    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id])

    useEffect(() => {
        setProduct(productEdit);
        setPhotoPreview(
            productEdit && productEdit.photo ? `${productEdit.photo.filePath}` : null
        );
        setProductDescription(
            productEdit && productEdit.description ? productEdit.description : ''
        );
    }, [productEdit])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handlePhotoChange = (e) => {
        setProductPhoto(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]));

    };

    const saveProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product?.name);
        formData.append('category', product?.category);
        formData.append('amount', product?.amount);
        formData.append('price', product?.price);
        formData.append('description', productDescription);

        if (productPhoto) {
            formData.append('photo', productPhoto);
        }

        try {
            dispatch(updateProduct({ id, formData }));
            toast.success('Product updated successfully');
        } catch (error) {
            toast.error('An error occurred while updated the product');
        }

        dispatch(getProducts());
        navigate('/dashboard');

        return null;
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Edit product</h3>
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

export default EditProduct