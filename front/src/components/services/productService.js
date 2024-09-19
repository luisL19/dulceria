// src/services/productService.js

const API_URL = 'http://localhost:3002'; // Cambia esto a la URL correcta de tu API

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Error fetching products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

export const addProductToCatalog = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Error adding product to catalog');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding product to catalog:', error);
    throw new Error('Error adding product to catalog');
  }
};

export const addProductToCart = async (userEmail, product) => {
  try {
    const response = await fetch(`${API_URL}/carts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, email: userEmail }),
    });
    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw new Error('Error adding product to cart');
  }
};

export const removeProductFromCart = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/carts/${productId}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to remove product from cart');
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw new Error('Error removing product from cart');
  }
};

export const getCartForUser = async (userEmail) => {
  try {
    const response = await fetch(`${API_URL}/carts?email=${userEmail}`);
    if (!response.ok) {
      throw new Error('Error fetching cart');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Error fetching cart');
  }
};
