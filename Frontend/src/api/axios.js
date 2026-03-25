import axios from 'axios';

/**
 * Axios instance for API calls
 * Configured with base URL and default headers
 */
const apiClient = axios.create({
  // Base URL for all API requests
  baseURL: 'http://localhost:5000/api',

  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * You can add JWT token to Authorization header here
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add token to Authorization header if it exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle errors globally if needed
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login if needed
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);


export default apiClient;
