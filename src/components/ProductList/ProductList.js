import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import './ProductList.css';
const ProductList = () => {
    const { productos, loading, error, deleteProducto } = useProductContext();
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            const result = await deleteProducto(id);
            if (result.success) {
                alert('Producto eliminado con éxito');
            }
        }
    };
    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }
    if (error) {
        return <div className="error">{error}</div>;
    }
    if (productos.length === 0) {
        return <div className="no-products">No hay productos disponibles. ¡A
            ñade uno nuevo!</div>;
    }
    return (
        <div className="product-list">
            <h2>Lista de Productos</h2>
            <div className="add-button-container">
                <Link to="/productos/nuevo" className="add-button">

                    Práctica F305: Desarrollo del Frontend en React para la Aplicación de Productos 12

                    Añadir Nuevo Producto
                </Link>
            </div>
            <div className="product-grid">
                {productos.map((producto) => (
                    <div key={producto._id} className="product-card">
                        <div className="product-header">
                            <h3>{producto.nombre}</h3>
                        </div>
                        <div className="product-body">
                            <p className="product-description">{producto.descripcion}</p>
                            <p className="product-meta">
                                <span className="product-price">${producto.precio.toFixed
                                    (2)}</span>
                                <span className="product-stock">Stock: {producto.stock}</span>
                            </p>
                            <p className="product-category">Categoría: {producto.categoria}</p>
                        </div>
                        <div className="product-actions">
                            <Link to={`/productos/${producto._id}`} className="view-button">
                                Ver
                            </Link>
                            <Link to={`/productos/editar/${producto._id}`} className="edit-button">
                                Editar
                            </Link>
                            <button
                                onClick={() => handleDelete(producto._id)}
                                className="delete-button"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}

                Práctica F305: Desarrollo del Frontend en React para la Aplicación de Productos 13

            </div>
        </div>
    );
};
export default ProductList;