import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kakinada-services-2.onrender.com/api',
});

// Attach the saved token to every request automatically, if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
