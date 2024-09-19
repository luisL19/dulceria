const API_URL = 'http://localhost:3002'; // URL de tu servidor JSON Server

// Obtener el carrito para un usuario
export const getCartForUser = async (userEmail) => {
    const response = await fetch(`${API_URL}/carts?email=${userEmail}`);
    if (!response.ok) {
        throw new Error('Error fetching cart');
    }
    return response.json();
};

// Obtener productos de un usuario
export const getProductsForUser = async (userEmail) => {
    const response = await fetch(`${API_URL}/products?email=${userEmail}`);
    if (!response.ok) {
        throw new Error('Error fetching products for user');
    }
    return response.json();
};

// Añadir producto al carrito
export const addProductToCart = async (product) => {
    try {
        const response = await fetch(`${API_URL}/carts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
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

// Eliminar producto del carrito
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

// Añadir producto al catálogo
export const addProductToCatalog = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Error adding product to catalog');
    }
    return response.json();
};
