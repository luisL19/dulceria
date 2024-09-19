// src/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  const login = (email) => {
    setUserEmail(email); // Establecer el correo del usuario autenticado
  };

  const logout = () => {
    setUserEmail(null); // Limpiar el correo del usuario
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
