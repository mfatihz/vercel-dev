import { useState, useEffect } from 'react';
import { Link } from 'react-router';
// import axios from 'axios';
import api from '../api';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies found. Add a movie to get started!</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
              <Link to={`/edit/${movie.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;