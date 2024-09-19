const API_URL = 'http://localhost:3002'; // URL de tu servidor JSON Server

export const addProductToCart = async (userEmail, product) => {
  try {
    // Añadir el producto al carrito en el servidor
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
    throw new Error('Error adding product to cart');
  }
};

export const getCartItems = async (userEmail) => {
  try {
    const response = await fetch(`${API_URL}/carts?email=${userEmail}`);
    if (!response.ok) {
      throw new Error('Error fetching cart items');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching cart items');
  }
};

export const removeProductFromCart = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/carts/${productId}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to remove product from cart');
    }
  } catch (error) {
    throw new Error('Error removing product from cart');
  }
};

export const addProductToCatalog = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Error adding product to catalog');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error adding product to catalog');
  }
};
