// src/api.js
import axios from "axios";

// Determinar la URL base según el entorno
const getBaseURL = () => {
  // En desarrollo, usar localhost:4000/v1
  if (import.meta.env.DEV) {
    return 'http://localhost:4000/v1'
  }
  // En producción, usar la variable de entorno o fallback
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/v1'
}

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;
