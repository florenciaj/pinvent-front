import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../Card/Card';
import './ProductForm.scss';

const ProductForm = ({
    product,
    productPhoto,
    photoPreview,
    productDescription,
    setProductDescription,
    handleInputChange,
    handlePhotoChange,
    saveProduct
}) => {
    return (
        <div className='add-product'>
            <Card cardClass={'card'}>
                <form onSubmit={saveProduct}>
                    <Card cardClass={'group'}>
                        <label>Product photo</label>
                        <code className='--color-dark'>
                            Supported formats: jpg, jpeg, png
                        </code>
                        <input type='file' name='photo' onChange={(e) => handlePhotoChange(e)} />
                        {photoPreview != null ? (
                            <div className='image-preview'>
                                <img src={photoPreview} alt='product' />
                            </div>
                        ) : (
                            <p>No image set for this poduct</p>
                        )}
                    </Card>

                    <label>Name</label>
                    <input type='text' placeholder='Name' name='name' value={product?.name} onChange={handleInputChange} />

                    <label>Category</label>
                    <input type='text' placeholder='Category' name='category' value={product?.category} onChange={handleInputChange} />

                    <label>Price</label>
                    <input type='text' placeholder='Price' name='price' value={product?.price} onChange={handleInputChange} />

                    <label>Amount</label>
                    <input type='text' placeholder='Amount' name='amount' value={product?.amount} onChange={handleInputChange} />

                    <label>Description</label>
                    <ReactQuill theme="snow" value={productDescription} onChange={setProductDescription} modules={ProductForm.modules} formats={ProductForm.formats} />
                    
                    <div className='--my'>
                        <button type='submit' className='--btn --btn-primary'>Save</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

ProductForm.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['clean'],
    ],
};
ProductForm.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'video',
    'image',
    'code-block',
    'align',
];

export default ProductForm