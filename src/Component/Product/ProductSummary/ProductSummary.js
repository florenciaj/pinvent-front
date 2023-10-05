import React, { useEffect } from 'react';
import { AiFillDollarCircle } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsCart4, BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_OUT_OF_STOCK, CALCULATE_STORE_VALUE, selectOutOfStock, selectTotalStoreValue } from '../../../Redux/Feature/Product/ProductSlice';
import Box from '../../Box/Box';
import './ProductSumarry.scss';

// icons
const productIcon = <BsCart4 size={40} color="#fff" />;
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;

// format amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const totalOutOfStock = useSelector(selectOutOfStock);

  useEffect(() => {
    dispatch(CALCULATE_STORE_VALUE(products));
    dispatch(CALCULATE_OUT_OF_STOCK(products));
  }, [dispatch, products])

  return (
    <div className="product-summary">
      <h3 className='--mt'>Stats</h3>
      <div className="info-summary">
        <Box icon={productIcon} title={'Total products'} quantity={products.length} backgroundColor='card1'></Box>
        <Box icon={earningIcon} title={'Total store value'} quantity={'0'} backgroundColor='card2'></Box>
        <Box icon={outOfStockIcon} title={'Out of stock'} quantity={'0'} amount={totalOutOfStock} backgroundColor='card3'></Box>
        <Box icon={categoryIcon} title={'Total categories'} quantity={'0'} amount={`$${formatNumbers(totalStoreValue.toFixed(2))}  `} backgroundColor='card4'></Box>
      </div>
    </div>
  )
}

export default ProductSummary