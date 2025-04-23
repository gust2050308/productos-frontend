import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';
const ProductForm = ({ producto, onSubmit, isEditing = false }) => {
    const navigate = useNavigate();
    // Configurar react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            categoria: ''
        }
    });
    // Cuando se está editando, cargar los valores del producto
    useEffect(() => {
        if (isEditing && producto) {
            reset({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                stock: producto.stock,
                categoria: producto.categoria
            });
        }

    }, [isEditing, producto, reset]);
    // Manejar el envío del formulario
    const handleFormSubmit = async (data) => {
        // Convertir valores numéricos
        const productoData = {
            ...data,
            precio: parseFloat(data.precio),
            stock: parseInt(data.stock)
        };
        const result = await onSubmit(productoData);
        if (result && result.success) {
            alert(isEditing ? 'Producto actualizado con éxito' : 'Producto creado conéxito');
            navigate('/productos');
        }
    };
    return (
        <div className="product-form-container">
            <h2>{isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
            <form className="product-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        {...register('nombre', {
                            required: 'El nombre es obligatorio',
                            minLength: {
                                value: 3,
                                message: 'El nombre debe tener al menos 3 caracteres'
                            }
                        })}
                    />

                    Práctica F305: Desarrollo del Frontend en React para la Aplicación de Productos 20

                    {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        {...register('descripcion', {
                            required: 'La descripción es obligatoria',
                            minLength: {
                                value: 10,
                                message: 'La descripción debe tener al menos 10 caracteres'
                            }
                        })}
                    ></textarea>
                    {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                            type="number"
                            id="precio"
                            step="0.01"
                            {...register('precio', {
                                required: 'El precio es obligatorio',
                                min: {
                                    value: 0.01,
                                    message: 'El precio debe ser mayor que 0'
                                },
                                validate: value => !isNaN(parseFloat(value)) || 'Debe ser un número válido'
                            })}
                        />
                        {errors.precio && <span className="error-message">{errors.precio.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            {...register('stock', {
                                required: 'El stock es obligatorio',
                                min: {
                                    value: 0,
                                    message: 'El stock no puede ser negativo'
                                },
                                validate: value => Number.isInteger(Number(value)) || 'Debe ser un número entero'
                            })}
                        />
                        {errors.stock && <span className="error-message">{errors.stock.
                            message}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoría</label>
                    <input
                        type="text"
                        id="categoria"
                        {...register('categoria', {
                            required: 'La categoría es obligatoria'
                        })}
                    />
                    {errors.categoria && <span className="error-message">{errors.categoria.message}</span>}
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">

                        Práctica F305: Desarrollo del Frontend en React para la Aplicación de Productos 22

                        {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/productos')}
                        className="cancel-button"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ProductForm;