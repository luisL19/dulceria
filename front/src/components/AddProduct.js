import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToCatalog } from './services/apiService'; 
import Swal from 'sweetalert2'; // Importar SweetAlert
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    region: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (parseFloat(product.price) <= 0) {
      setError('Price must be greater than zero.');
      return;
    }
    try {
      await addProductToCatalog(product); 
      console.log('Product added:', product);

      // Mostrar la alerta después de agregar el producto
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/'); // Redirige a la página de inicio después de agregar
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="add-product-wrap">
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del producto</label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen URL</label>
          <input
            id="image"
            name="image"
            type="text"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona la categoria</option>
            <option value="chocolates">Chocolates</option>
            <option value="dulces">Dulces</option>
            <option value="galletas">Galletas</option>
            <option value="gomitas">Gomas</option>
            <option value="promociones">Promociones</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            value={product.region}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona la region</option>
            <option value="nacional">Nacional</option>
            <option value="internacional">Internacional</option>
          </select>
        </div>
        <button type="submit">Agregar producto</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
