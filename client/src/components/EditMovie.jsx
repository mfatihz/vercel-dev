import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
// import axios from 'axios';
import api from '../api';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api' // Base URL backend
// });

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/movies/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating movie:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <div>Loading movie data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-movie-form">
      <h2>Edit Movie</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;