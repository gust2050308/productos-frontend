import React, { createContext, useState, useContext, useEffect } from 'react';
import productoService from '../services/api';
// Creamos el contexto
const ProductContext = createContext();
// Hook personalizado para usar el contexto
export const useProductContext = () => useContext(ProductContext);
// Proveedor del contexto
export const ProductProvider = ({ children }) => {
    // Estado para almacenar los productos
    const [productos, setProductos] = useState([]);
    // Estado para controlar la carga de datos
    const [loading, setLoading] = useState(true);
    // Estado para manejar errores
    const [error, setError] = useState(null);
    // Función para cargar todos los productos
    const fetchProductos = async () => {
        try {
            setLoading(true);
            setError(null);


            const data = await productoService.getProductos();
            setProductos(data.datos || []);
        } catch (err) {
            setError('Error al cargar los productos. Intente nuevamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    // Función para añadir un nuevo producto
    const addProducto = async (productoData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await productoService.createProducto(productoData);
            if (response.exitoso) {
                // Actualizamos la lista de productos añadiendo el nuevo
                setProductos([...productos, response.datos]);
                return { success: true, producto: response.datos };
            }
        } catch (err) {
            setError('Error al añadir el producto. Intente nuevamente.');
            console.error(err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };
    // Función para actualizar un producto
    const updateProducto = async (id, productoData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await productoService.updateProducto(id, productoData);
            if (response.exitoso) {
                // Actualizamos la lista de productos
                setProductos(
                    productos.map(producto =>
                        producto._id === id ? response.datos : producto
                    )
                );
                return { success: true, producto: response.datos };
            }
        } catch (err) {
            setError('Error al actualizar el producto. Intente nuevamente.');
            console.error(err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };
    // Función para eliminar un producto
    const deleteProducto = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await productoService.deleteProducto(id);
            if (response.exitoso) {
                // Filtramos el producto eliminado de la lista
                setProductos(productos.filter(producto => producto._id !== id));
                return { success: true };
            }
        } catch (err) {
            setError('Error al eliminar el producto. Intente nuevamente.');
            console.error(err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);


        }
    };
    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProductos();
    }, []);
    // Valor del contexto que estará disponible para los componentes
    const value = {
        productos,
        loading,
        error,
        fetchProductos,
        addProducto,
        updateProducto,
        deleteProducto
    };
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
export default ProductContext;