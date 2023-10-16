import React, { useEffect, useState } from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../Redux/Feature/Product/FilterSlice';
import { deleteProduct, getProducts } from '../../../Redux/Feature/Product/ProductSlice';
import { SpinnerImg } from "../../Loader/Loader";
import Search from "../../Search/Search";
import './ProductList.scss';

const ProductList = ({ products, isLoading }) => {

  const [search, setSearch] = useState('');
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  const shortenText = (text, charactersLength) => {
    if (text.length > charactersLength) {
      const shortenedText = text.substring(0, charactersLength).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delProduct = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch])

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory</h3>
          </span>
          <span>
            <Search value={search} onChange={(e) => { setSearch(e.target.value) }} />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products found. You can create a new one.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((product, index) => {
                    const { _id, name, category, price, amount } = product;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name, 16)}</td>
                        <td>{category}</td>
                        <td>${price}</td>
                        <td>{amount}</td>
                        <td>${price * amount}</td>
                        <td className='icons'>
                          <span>
                            <AiOutlineEye size={25} color={'purple'}></AiOutlineEye>
                          </span>
                          <span>
                            <FaEdit size={20} color={'green'}></FaEdit>
                          </span>
                          <span>
                            <FaTrashAlt size={20} color={'red'} onClick={() => confirmDelete(_id)}></FaTrashAlt>
                          </span>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={20}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  )
}

export default ProductList