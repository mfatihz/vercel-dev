import axios from 'axios';

const api = axios.create({
  baseURL:
    window.location.hostname === 'localhost' && window.location.port === '5173'
      ? 'http://localhost:5000/api' // Vite dev server
      : window.location.hostname === 'localhost' && window.location.port === '3000'
        ? 'http://localhost:5000/api' // Vercel dev
        : '/api' // Production
});


export default api;