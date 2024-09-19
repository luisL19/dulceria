import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './ShoppingCart.css';

const ShoppingCart = ({ isCartOpen, closeCart }) => {
  const { cartItems, removeItemFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Agrupar los elementos por ID y calcular la cantidad total
  const groupedItems = cartItems.reduce((acc, item) => {
    const existing = acc.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      acc.push({ ...item, quantity: item.quantity || 1 });
    }
    return acc;
  }, []);

  // Calcular el total
  const total = groupedItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return acc + (price * quantity);
  }, 0);

  const handlePurchase = () => {
    if (groupedItems.length === 0) {
      // Mostrar alerta si el carrito está vacío
      Swal.fire({
        icon: 'warning',
        title: 'Carrito Vacío',
        text: 'No puedes continuar con la compra sin productos en el carrito.',
        confirmButtonText: 'Cerrar',
      });
      return; // No continuar si el carrito está vacío
    }

    navigate('/checkout', { state: { cartItems: groupedItems } });
  };

  return (
    <div className={`shopping-cart ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button onClick={closeCart}>Cerrar</button>
      </div>
      <div className="cart-items">
        {groupedItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          groupedItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={() => removeItemFromCart(item.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={handlePurchase}>Finalizar compra</button>
        <button onClick={clearCart}>Vaciar carrito</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
