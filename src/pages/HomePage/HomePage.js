import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
const HomePage = () => {
return (
<div className="home-container">
<div className="hero-section">
<h1>Sistema de Gestión de Productos</h1>
<p>
Bienvenido a nuestra aplicación para gestionar el inventario de produ
ctos.
Añade, edita, visualiza y elimina productos de forma sencilla y eficien
te.
</p>
<Link to="/productos" className="cta-button">
Ver Productos
</Link>
</div>
<div className="features-section">
<h2>Funcionalidades</h2>
<div className="features-grid">
<div className="feature-card">
<h3>Gestión Completa</h3>
<p>

Práctica F305: Desarrollo del Frontend en React para la Aplicación de Productos 34

Realiza todas las operaciones CRUD (Crear, Leer, Actualizar, Elimin
ar)
sobre tu inventario de productos.
</p>
</div>
<div className="feature-card">
<h3>Interfaz Intuitiva</h3>
<p>
Diseño amigable y responsivo que facilita la navegación y el uso
de todas las funcionalidades.
</p>
</div>
<div className="feature-card">
<h3>Base de Datos en Tiempo Real</h3>
<p>
Todos los cambios se reflejan inmediatamente en la base de datos
MongoDB, asegurando la consistencia de la información.
</p>
</div>
<div className="feature-card">
<h3>Arquitectura Segura</h3>
<p>
Implementado con una arquitectura VPC que separa el frontend pú
blico
del backend y base de datos en subredes privadas.
</p>
</div>
</div>
</div>
</div>
);
};
export default HomePage;

