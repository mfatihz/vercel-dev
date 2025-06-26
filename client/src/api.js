import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' && window.location.port === '3000'
    ? 'http://localhost:5000/api'  // Untuk Vercel dev
    : '/api'                       // Untuk production
});

export default api;