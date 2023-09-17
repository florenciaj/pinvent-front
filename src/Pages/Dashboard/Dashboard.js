import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../Component/Product/ProductList/ProductList';
import ProductSummary from '../../Component/Product/ProductSummary/ProductSummary';
import RedirectLoggedOut from '../../CustomHook/RedirectLoggedOut';
import { selectIsLoggedIn } from '../../Redux/Feature/Auth/Auth';
import { getProducts } from '../../Redux/Feature/Product/ProductSlice';

const Dashboard = () => {
    RedirectLoggedOut("/login");
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isLoading, isError, message } = useSelector((state) => state.product);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getProducts());
        }
    }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div>
            <ProductSummary products={products}></ProductSummary>
            <ProductList products={products} isLoading={isLoading}></ProductList>
        </div>
    )
}

export default Dashboard