import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from './authService';
import './auth.css';

const Login = ({ onLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await loginUser({ email, password });
      console.log('Login successful:', user);

      onLogin(user);

      if (user.role === 'vendedor') {
        navigate('/add-product');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const newUser = { email, password, name, role: 'cliente' };
      const response = await registerUser(newUser);
      console.log('Registro exitoso:', response);
      setIsSignIn(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked={isSignIn} onChange={() => setIsSignIn(true)} />
        <label htmlFor="tab-1" className="tab">Iniciar sesión</label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!isSignIn} onChange={() => setIsSignIn(false)} />
        <label htmlFor="tab-2" className="tab">Registrarse</label>
        <div className="login-form">
          {isSignIn ? (
            <div className="sign-in-htm">
              <form onSubmit={handleSignIn}>
                <div className="group">
                  <label htmlFor="signin-email" className="label">Correo electrónico</label>
                  <input id="signin-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="group">
                  <label htmlFor="signin-password" className="label">Contraseña</label>
                  <input id="signin-password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Iniciar sesión" />
                </div>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          ) : (
            <div className="sign-up-htm">
              <form onSubmit={handleRegister}>
                <div className="group">
                  <label htmlFor="register-name" className="label">Nombre</label>
                  <input id="register-name" type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="group">
                  <label htmlFor="register-email" className="label">Correo electrónico</label>
                  <input id="register-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="group">
                  <label htmlFor="register-password" className="label">Contraseña</label>
                  <input id="register-password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Registrarse" />
                </div>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
