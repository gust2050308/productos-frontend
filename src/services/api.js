import axios from 'axios';
// Creamos una instancia de axios con la URL base de nuestra API
// En desarrollo local usaremos localhost, pero esto cambiará en producció
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Servicios para operaciones con productos
const productoService = {
    // Obtener todos los productos
    getProductos: async () => {
        try {
            const response = await api.get('/productos');
            return response.data;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },


    // Obtener un producto por su ID
    getProducto: async (id) => {
        try {
            const response = await api.get(`/productos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el producto ${id}:`, error);
            throw error;
        }
    },
    // Crear un nuevo producto
    createProducto: async (productoData) => {
        try {
            const response = await api.post('/productos', productoData);
            return response.data;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },
    // Actualizar un producto existente
    updateProducto: async (id, productoData) => {
        try {
            const response = await api.put(`/productos/${id}`, productoData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el producto ${id}:`, error);
            throw error;
        }
    },
    // Eliminar un producto
    deleteProducto: async (id) => {
        try {
            const response = await api.delete(`/productos/${id}`);
            return response.data;


        } catch (error) {
            console.error(`Error al eliminar el producto ${id}:`, error);
            throw error;
        }
    }
};
export default productoService;