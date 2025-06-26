import { useState } from 'react';
import { useNavigate } from 'react-router';
// import axios from 'axios';
import api from '../api';

// Buat instance axios dengan baseURL
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api' // Sesuaikan dengan port backend
// });

const AddMovie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/movies', formData);
      if (response.data) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formData.director}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;