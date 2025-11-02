import axios from 'axios';
import KeycloakService from '../lib/keycloak/service';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084',
  headers: {
    'Accept': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = KeycloakService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = KeycloakService.getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (['post', 'put', 'patch'].includes(config.method?.toLowerCase() || '')) {
//       config.headers['Content-Type'] = 'application/json';
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        KeycloakService.doLogout();
        return Promise.reject(error);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      KeycloakService.doLogout();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
