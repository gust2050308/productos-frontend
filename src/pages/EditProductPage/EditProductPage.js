import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useProductContext } from '../../context/ProductContext';
import productoService from '../../services/api';
import './EditProductPage.css';
const EditProductPage = () => {
    const { id } = useParams();
    const { updateProducto } = useProductContext();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                const response = await productoService.getProducto(id);
                if (response.exitoso) {
                    setProducto(response.datos);
                } else {
                    setError('No se pudo cargar el producto');
                }
            } catch (err) {
                setError('Error al cargar el producto. Intente nuevamente.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducto();
    }, [id]);


    const handleUpdate = async (productoData) => {
        return await updateProducto(id, productoData);
    };
    if (loading) {
        return <div className="loading">Cargando producto...</div>;
    }
    if (error || !producto) {
        return <div className="error">{error || 'Producto no encontrado'}</div>;
    }
    return (
        <div className="edit-product-page">
            <ProductForm
                producto={producto}
                onSubmit={handleUpdate}
                isEditing={true}
            />
        </div>
    );
};
export default EditProductPage;