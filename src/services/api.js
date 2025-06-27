// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/v1',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      console.warn('Sesión expirada');
      localStorage.removeItem('token');
      // Devuelve un error especial que luego capturas
      return Promise.reject({ isAuthError: true, originalError: err });
    }
    return Promise.reject(err);
  }
);

export default api