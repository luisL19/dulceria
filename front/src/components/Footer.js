import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <p>Correo: contact@dulces.co</p>
          <p>Celular: +3506622198</p>
        </div>
      
        <div className="footer-section">
          <h3>Síguenos</h3>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Luis-Lugo
      </div>
    </footer>
  );
};

export default Footer;
