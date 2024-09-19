import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:3002/users/${user.id}`);
          if (response.data) {
            setUserData(response.data);
            setFormData({
              name: response.data.name,
              username: response.data.username,
              email: response.data.email,
              role: response.data.role,
            });
          } else {
            setError('No se encontró el usuario.');
          }
        } catch (err) {
          setError('Error al cargar los datos del perfil.');
          console.error('Error details:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No se ha autenticado ningún usuario.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3002/users/${user.id}`, formData);
      if (response.data) {
        setUserData(response.data);
        setIsEditing(false);
      }
    } catch (err) {
      setError('Error al actualizar los datos del perfil.');
      console.error('Error details:', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-row">
            <div className="profile-field">
              <label><i className="fas fa-user"></i> Nombre:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="profile-field">
              <label><i className="fas fa-user-tag"></i> Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-field">
              <label><i className="fas fa-envelope"></i> Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="profile-field">
              <label><i className="fas fa-id-badge"></i> Rol:</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="profile-button">Actualizar</button>
          <button type="button" onClick={handleEditToggle} className="profile-button">Cancelar</button>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-row">
            <p><i className="fas fa-user"></i><strong>Nombre:</strong> {userData.name}</p>
            <p><i className="fas fa-user-tag"></i><strong>Username:</strong> {userData.username}</p>
          </div>
          <div className="profile-row">
            <p><i className="fas fa-envelope"></i><strong>Email:</strong> {userData.email}</p>
            <p><i className="fas fa-id-badge"></i><strong>Rol:</strong> {userData.role}</p>
          </div>
          <button onClick={handleEditToggle} className="profile-button">Editar</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
