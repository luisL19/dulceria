import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente que redirige a la página de inicio de sesión si el usuario no está autenticado.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isAuthenticated - Indica si el usuario está autenticado.
 * @param {React.ReactNode} props.children - Los elementos hijos que se renderizarán si el usuario está autenticado.
 * @returns {React.ReactNode} - Un componente que redirige si el usuario no está autenticado o muestra los hijos si está autenticado.
 */
const RedirectIfNotAuthenticated = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default RedirectIfNotAuthenticated;
