import React from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useProductContext } from '../../context/ProductContext';
const AddProductPage = () => {
const { addProducto } = useProductContext();
return (
<div className="add-product-page" style={{ padding: '40px 0' }}>
<ProductForm onSubmit={addProducto} />
</div>
);
};
export default AddProductPage;