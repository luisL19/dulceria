import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductFilter.css';
import ProductModal from './ProductModal'; // Verifica que la ruta y nombre sean correctos
import { addProductToCart } from '../components/services/cartService'; // Asegúrate de que la ruta sea correcta
import { useCart } from './CartContext'; // Importa el hook del contexto


const ProductFilter = ({ addToCart, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCart(); // Usar el hook del contexto


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/products'); // Asegúrate de que la URL sea correcta
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar los productos.');
        console.error('Error details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'all' || product.category === categoryFilter) &&
      (regionFilter === 'all' || product.region === regionFilter) &&
      (priceFilter === 'all' ||
        (priceFilter === 'low' && product.price < 2) ||
        (priceFilter === 'medium' && product.price >= 2 && product.price <= 3) ||
        (priceFilter === 'high' && product.price > 3))
    );
  });

  const handleAddToCart = async (product) => {
    try {
      await addProductToCart(user?.email || '', { ...product, quantity: 1 });
      alert("Producto añadido al carrito");
      addToCart({ ...product, quantity: 1 });
    } catch (error) {
      alert('Error al añadir el producto al carrito');
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartFromModal = async (product) => {
    await addItemToCart({ ...product, email: user?.email || '' }); // Asegúrate de pasar el email del usuario
    closeModal();
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="product-filter">
      <div className="filter-section">
        <div className="filter-options">
          <label htmlFor="search">Buscar:</label>
          <input
            type="text"
            id="search"
            placeholder="Buscar dulces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filtro por Categoría */}
          <label htmlFor="category">Categoría:</label>
          <select id="category" onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="chocolates">Chocolates</option>
            <option value="dulces">Dulces</option>
            <option value="gomitas">Gomitas</option>
            <option value="galletas">Galletas</option>
          </select>

          {/* Filtro por Región */}
          <label htmlFor="region">Región:</label>
          <select id="region" onChange={(e) => setRegionFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="nacional">Nacional</option>
            <option value="internacional">Internacional</option>
          </select>

          {/* Filtro por Rango de Precios */}
          <label htmlFor="price">Precio:</label>
          <select id="price" onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="low">Menos de $2</option>
            <option value="medium">$2 - $3</option>
            <option value="high">Más de $3</option>
          </select>
        </div>
      </div>

      <div className="product-list-section">
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={() => handleProductClick(product)}>Ver producto</button>
              <button onClick={() => handleAddToCart(product)}>Añadir al carrito</button>
            </div>
          ))}
        </div>

        {/* Mostrar el modal si hay un producto seleccionado */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeModal}
            onAddToCart={handleAddToCartFromModal}
          />
        )}
      </div>
    </section>
  );
};

export default ProductFilter;
