import React from 'react';
import './ProductModal.css';
import { useCart } from './CartContext'; // Importar el hook del contexto

const ProductModal = ({ product, onClose }) => {
  const { addItemToCart } = useCart(); // Usar el hook del contexto

  if (!product) return null;

  // Convertir el precio a un número flotante
  const price = parseFloat(product.price);
  const formattedPrice = isNaN(price) ? 'N/A' : price.toFixed(2);

  const handleAddToCart = () => {
    addItemToCart(product); // Añadir el producto al carrito
    onClose(); // Cerrar el modal después de añadir al carrito
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose}>✖</button>
        <img src={product.image} alt={product.name} className="product-modal-image" />
        <h2>{product.name}</h2>
        <p>Precio: ${formattedPrice}</p>
        <p>Categoría: {product.category || 'No disponible'}</p>
        <p>Región: {product.region || 'No disponible'}</p>
        <p>Descripción: {product.description || 'No disponible'}</p> {/* Agregado */}
        <button className="product-modal-add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductModal;
