import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    GestorProductos
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/productos" className="nav-link">
                            Productos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/productos/nuevo" className="nav-link">
                            Añadir Producto
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;
