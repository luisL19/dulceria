import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Asegúrate de importar el hook correctamente
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Checkout.css';

function Checkout() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [deliveryData, setDeliveryData] = useState({
    address: '',
    city: '',
    postalCode: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const cartItemsFromState = location.state?.cartItems || cartItems;

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir letras para el nombre
    if (name === 'name' && /^[a-zA-Z\s]*$/.test(value)) {
      setUserData({ ...userData, [name]: value });
    } else if (name === 'email') {
      setUserData({ ...userData, [name]: value });
    } else if (name === 'phone' && /^\d*$/.test(value)) {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleDeliveryDataChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir letras y números para dirección y ciudad
    if ((name === 'address' || name === 'city') && /^[a-zA-Z0-9\s]*$/.test(value)) {
      setDeliveryData({ ...deliveryData, [name]: value });
    } else if (name === 'postalCode' && /^\d*$/.test(value)) {
      setDeliveryData({ ...deliveryData, [name]: value });
    }
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir números para los campos de pago
    if (name === 'cardNumber' && /^\d*$/.test(value)) {
      setPaymentData({ ...paymentData, [name]: value });
    } else if (name === 'cardExpiry' && /^\d{0,5}$/.test(value)) { // MM/AA o MM/YYYY
      setPaymentData({ ...paymentData, [name]: value });
    } else if (name === 'cardCVC' && /^\d{0,3}$/.test(value)) {
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!userData.name || !userData.email || !userData.phone) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Vacíos',
          text: 'Por favor, completa todos los campos personales.',
          confirmButtonText: 'Cerrar',
        });
        return;
      }
    }

    if (step === 2) {
      if (!deliveryData.address || !deliveryData.city || !deliveryData.postalCode) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Vacíos',
          text: 'Por favor, completa todos los campos de entrega.',
          confirmButtonText: 'Cerrar',
        });
        return;
      }
    }

    if (step === 3) {
      if (!paymentData.cardNumber || !paymentData.cardExpiry || !paymentData.cardCVC) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Vacíos',
          text: 'Por favor, completa todos los campos de pago.',
          confirmButtonText: 'Cerrar',
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    clearCart();
    setSuccessMessage(true);

    await Swal.fire({
      icon: 'success',
      title: 'Compra Exitosa',
      text: 'Gracias por tu compra!',
      confirmButtonText: 'Cerrar',
    });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const calculateTotalPrice = () => {
    return cartItemsFromState.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        {successMessage && (
          <div className="success-message">
            <h2>Compra Exitosa</h2>
          </div>
        )}

        {!successMessage && (
          <div className="checkout-content">
            <div className="checkout-steps">
              {step === 1 && (
                <div className="step">
                  <h2>Datos Personales</h2>
                  <label>
                    Nombre:
                    <input type="text" name="name" value={userData.name} onChange={handleUserDataChange} required />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleUserDataChange} required />
                  </label>
                  <label>
                    Teléfono:
                    <input type="text" name="phone" value={userData.phone} onChange={handleUserDataChange} required />
                  </label>
                  <div className="step-navigation">
                    <button className="next-button" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step">
                  <h2>Datos de Entrega</h2>
                  <label>
                    Dirección:
                    <input type="text" name="address" value={deliveryData.address} onChange={handleDeliveryDataChange} required />
                  </label>
                  <label>
                    Ciudad:
                    <input type="text" name="city" value={deliveryData.city} onChange={handleDeliveryDataChange} required />
                  </label>
                  <label>
                    Código Postal:
                    <input type="text" name="postalCode" value={deliveryData.postalCode} onChange={handleDeliveryDataChange} required />
                  </label>
                  <div className="step-navigation">
                    <button className="previous-button" onClick={handlePrevious}>Anterior</button>
                    <button className="next-button" onClick={handleNext}>Siguiente</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="step">
                  <h2>Pago</h2>
                  <label>
                    Número de Tarjeta:
                    <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentDataChange} required />
                  </label>
                  <label>
                    Fecha de Expiración:
                    <input type="text" name="cardExpiry" value={paymentData.cardExpiry} onChange={handlePaymentDataChange} required />
                  </label>
                  <label>
                    CVC:
                    <input type="text" name="cardCVC" value={paymentData.cardCVC} onChange={handlePaymentDataChange} required />
                  </label>
                  <div className="step-navigation">
                    <button className="previous-button" onClick={handlePrevious}>Anterior</button>
                    <button className="next-button" onClick={handleSubmit}>Finalizar Compra</button>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-summary">
              <h2>Resumen de Compra</h2>
              <ul>
                {cartItemsFromState.map((item) => (
                  <li key={item.id} className="checkout-item">
                    <div className="product-info">
                      <h3>{item.name} (x{item.quantity})</h3>
                      <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <img src={item.image} alt={item.name} className="product-image" />
                  </li>
                ))}
              </ul>
              <h3 className="total">Total: ${calculateTotalPrice().toFixed(2)}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
