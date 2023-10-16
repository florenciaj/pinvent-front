import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RedirectLoggedOut from '../../../CustomHook/RedirectLoggedOut';
import { selectIsLoggedIn } from '../../../Redux/Feature/Auth/Auth';
import { getProduct } from '../../../Redux/Feature/Product/ProductSlice';
import Card from '../../Card/Card';
import { SpinnerImg } from '../../Loader/Loader';
import "./ProductDetail.scss";

const ProductDetail = () => {
  RedirectLoggedOut("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const stockStatus = (amount) => {
    if (amount > 0) {
      return <span className="--color-success">In stock</span>
    }

    return <span className="--color-danger">Out of stock</span>
  }

  return (
    <div className="product-detail">
      <h3 className="--mt">Product detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.photo ? (
                <img src={product.photo.filePath} />
              ) : (
                <p>No photo set for this product</p>
              )}
            </Card>

            <h4>Product availability: {stockStatus(product.amount)}</h4>
            <hr />

            <h4>
              <span className='badge'>Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Amount in stock : </b> {product.amount}
            </p>
            <p>
              <b>&rarr; Total value in stock : </b>
              ${product.price * product.amount}
            </p>
            <hr />
            <p>
              <b>&rarr; Description : </b>
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></p>
            <hr />
            <code className="--color-dark">
              Created at: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last update: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ProductDetail