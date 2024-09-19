import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = ({ toggleCart, onLogout, user }) => { // Añadido user como prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout(); // Llama a la función de cerrar sesión pasada como prop
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Candy Jobs - Distribuidor de Dulces" />
          </Link>
        </div>
        <nav className="main-nav">
          {/* Enlace a "Vender" */}
          
        </nav>
        <div className="user-options">
        <a href="#" className="search-icon">🔍</a>
          <a href="#" onClick={toggleCart}>🛒</a>
           <Link to="/add-product" className="nav-button">Vender</Link>
          {!user ? (
            <Link to="/login" className="nav-button login">Iniciar sesión</Link>
          ) : (
            <div className="account-menu">
              <button className="account-button" onClick={handleMenuToggle}>
                Cuenta
              </button>
              {isMenuOpen && (
                <div className="account-dropdown">
                  <Link to="/profile" className="account-dropdown-item">Perfil</Link>
                  <a href="/" className="account-dropdown-item" onClick={handleLogout}>Cerrar sesión</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
