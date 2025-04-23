import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import productoService from '../../services/api';
import './ProductDetail.css';
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await productoService.deleteProducto(id);
                if (response.exitoso) {
                    alert('Producto eliminado con éxito');
                    navigate('/productos');
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (err) {
                console.error('Error al eliminar:', err);
                alert('Error al eliminar el producto. Intente nuevamente.');
            }
        }
    };
    if (loading) {


        return <div className="loading">Cargando producto...</div>;
    }
    if (error || !producto) {
        return <div className="error">{error || 'Producto no encontrado'}</div
        >;
    }
    return (
        <div className="product-detail-container">
            <div className="product-detail-card">
                <h2 className="product-title">{producto.nombre}</h2>
                <div className="product-info">
                    <div className="product-section">
                        <h3>Descripción</h3>
                        <p>{producto.descripcion}</p>
                    </div>
                    <div className="product-section">
                        <h3>Detalles</h3>
                        <ul className="product-details-list">
                            <li>
                                <span className="detail-label">Precio:</span>
                                <span className="detail-value price">${producto.precio.toFixed(2)}</span>
                            </li>
                            <li>
                                <span className="detail-label">Stock:</span>
                                <span className={`detail-value stock ${producto.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                    {producto.stock > 0 ? `${producto.stock} unidades` : 'Agotado'}
                                </span>
                            </li>
                            <li>
                                <span className="detail-label">Categoría:</span>
                                <span className="detail-value">{producto.categoria}</span>
                            </li>
                            <li>

                                Práctica F305: Desarrollo del Frontend en React para la Aplicación de Productos 28

                                <span className="detail-label">Fecha de Creación:</span>
                                <span className="detail-value">
                                    {new Date(producto.fechaCreacion).toLocaleDateString()}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="product-actions">
                    <Link to="/productos" className="action-button back-button">
                        Volver a la Lista
                    </Link>
                    <div className="action-group">
                        <Link
                            to={`/productos/editar/${producto._id}`}
                            className="action-button edit-button"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="action-button delete-button"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;