// src/services/authService.js

const API_URL = 'http://localhost:3002'; // Cambia esto a la URL correcta de tu API

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    const user = users.find(user => 
      user.email === credentials.email && user.password === credentials.password
    );
    if (user) {
      return user;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Error al iniciar sesión');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw new Error('Error al registrar usuario');
  }
};
