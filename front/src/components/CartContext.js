import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { addProductToCart as apiAddProductToCart, getCartForUser, removeProductFromCart } from './services/apiService';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [userEmail, setUserEmail] = useState(null); // Estado del usuario

  useEffect(() => {
    const loadCart = async () => {
      if (userEmail) {
        try {
          const cart = await getCartForUser(userEmail);
          setCartItems(cart);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        // Si no hay usuario, limpiar el carrito
        setCartItems([]);
      }
    };
    loadCart();
  }, [userEmail]);

  useEffect(() => {
    // Guardar el carrito en localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = async (item) => {
    try {
      if (userEmail) {
        const newItem = { ...item, email: userEmail }; // Asegurarse de incluir el email
        await apiAddProductToCart(newItem);
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((i) => i.id === item.id);
          const updatedItems = existingItem
            ? prevItems.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
                  : i
              )
            : [...prevItems, { ...newItem, quantity: item.quantity || 1 }];

          // Mostrar la alerta después de agregar el producto
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1500,
          });

          return updatedItems;
        });
      } else {
        // Lógica para agregar el producto al carrito sin usuario
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((i) => i.id === item.id);
          const updatedItems = existingItem
            ? prevItems.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
                  : i
              )
            : [...prevItems, { ...item, quantity: item.quantity || 1 }];

          // Mostrar la alerta después de agregar el producto
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1500,
          });

          return updatedItems;
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      await removeProductFromCart(itemId);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map(item => removeProductFromCart(item.id)));
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleLogin = async (email) => {
    setUserEmail(email);
    // Cargar el carrito del usuario al iniciar sesión
    const cart = await getCartForUser(email);
    setCartItems(cart);
  };

  

  return (
    <CartContext.Provider value={{
      cartItems, // Solo se cargan los productos del usuario
      addItemToCart,
      removeItemFromCart,
      clearCart,
      handleLogin,
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
