import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductFilter from './components/ProductFilter';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import Login from './components/auth/Login';
import Checkout from './components/Checkout';
import AddProduct from './components/AddProduct';
import Profile from './components/Profile';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const CartHandler = ({ isCartOpen, closeCart }) => {
  return <ShoppingCart isCartOpen={isCartOpen} closeCart={closeCart} />;
};

function App() {
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/login';
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header toggleCart={toggleCart} onLogout={handleLogout} user={user} onCategoryClick={handleCategoryClick} />
            <Routes>
              <Route path="/" element={<Hero selectedCategory={selectedCategory} />} />
              <Route path="/products" element={<ProductFilter />} />
              <Route path="/shopping-cart" element={<CartHandler isCartOpen={isCartOpen} closeCart={closeCart} />} />
              <Route path="/checkout" element={
                <ProtectedRoute isAuthenticated={!!user}>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/add-product" element={
                <ProtectedRoute isAuthenticated={!!user}>
                  <AddProduct />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/profile" element={
                <ProtectedRoute isAuthenticated={!!user}>
                  <Profile user={user} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {isCartOpen && <CartHandler isCartOpen={isCartOpen} closeCart={closeCart} />}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
