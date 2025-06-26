import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
// import axios from 'axios';
import api from '../api';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api' // Base URL backend
// });

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <div className="detail-item">
        <strong>Director:</strong> {movie.director}
      </div>
      <div className="detail-item">
        <strong>Year:</strong> {movie.year}
      </div>
      <div className="detail-item">
        <strong>Genre:</strong> {movie.genre}
      </div>
      <Link to="/" className="back-link">
        ← Back to list
      </Link>
    </div>
  );
};

export default MovieDetails;