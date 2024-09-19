import React, { useState, useEffect } from 'react';
import './Hero.css';
import fondo from '../assets/fondo.jpg';
import chocolates from '../assets/chocolates.png';
import dulce from '../assets/dulce.png';
import galleta from '../assets/galleta.png';
import goma from '../assets/goma.png';
import promociones from '../assets/promociones.png';
import ProductModal from './ProductModal';
import ShoppingCart from './ShoppingCart';
import { getProducts, addProductToCatalog } from '../components/services/productService'; // Asegúrate de importar correctamente
import { addProductToCart } from '../components/services/cartService';

const Hero = ({ user, addToCart, cartItems, isCartOpen, closeCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const initialProducts = await getProducts();
        setProducts(initialProducts);
      } catch (error) {
        setError('Error al cargar los productos.');
        console.error('Error details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const slides = [fondo];

  const showSlide = (index) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (priceRange ? parseFloat(product.price) <= parseFloat(priceRange) : true) &&
    (selectedCategory ? product.category === selectedCategory : true) &&
    (selectedRegion ? product.region === selectedRegion : true)
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartFromModal = async (product) => {
    try {
      await addProductToCart(user?.email || '', { ...product, quantity: 1 });
      alert("Producto añadido al carrito");
      addToCart({ ...product, quantity: 1 });
      closeModal();
    } catch (error) {
      alert('Error al añadir el producto al carrito');
    }
  };

  const addProduct = async (product) => {
    try {
      await addProductToCatalog(product);
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      window.scrollTo(0, 0); // Lleva al usuario al inicio de la página
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="hero">
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
        <div className="hero-controls">
          <button onClick={() => showSlide(currentSlide - 1)}>❮</button>
          <button onClick={() => showSlide(currentSlide + 1)}>❯</button>
        </div>
        <div className="hero-content">
          <h1>Tienda</h1>
          <div className="categories">
            <div className="category" onClick={() => handleCategoryClick('chocolates')}>
              <img src={chocolates} alt="Chocolate" />
              <p>CHOCOLATE</p>
              <span>4 Productos</span>
            </div>
            <div className="category" onClick={() => handleCategoryClick('dulces')}>
              <img src={dulce} alt="Dulces" />
              <p>DULCES</p>
              <span>4 Productos</span>
            </div>
            <div className="category" onClick={() => handleCategoryClick('galletas')}>
              <img src={galleta} alt="Galletas" />
              <p>GALLETAS</p>
              <span>6 Productos</span>
            </div>
            <div className="category" onClick={() => handleCategoryClick('gomitas')}>
              <img src={goma} alt="Gomas" />
              <p>GOMAS</p>
              <span>4 Productos</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-products">
        <div className="product-filter">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <label>Precio Máximo:</label>
            <input
              type="number"
              placeholder="Ej. 5.00"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
          <div>
            <label>Categoría:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Todas</option>
              <option value="chocolates">Chocolates</option>
              <option value="dulces">Dulces</option>
              <option value="gomitas">Gomitas</option>
              <option value="galletas">Galletas</option>
            </select>
          </div>
          <div>
            <label>Región:</label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              <option value="">Todas</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
          </div>
        </div>
        <div className="hero-product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="hero-product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${parseFloat(product.price).toFixed(2)}</p>
              <button onClick={() => handleProductClick(product)}>Ver producto</button>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          onAddToCart={handleAddToCartFromModal}
        />
      )}

      <ShoppingCart
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        closeCart={closeCart}
      />
    </section>
  );
};

export default Hero;
