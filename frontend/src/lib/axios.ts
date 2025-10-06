/**
 * axios.ts
 * Configures a reusable Axios instance for API requests.
 * Automatically attaches JWT tokens and handles unauthorized responses globally.
 */

import axios from "axios";

/**
 * Create a preconfigured Axios instance.
 * The base URL is defined via Vite environment variables.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Adds the Authorization header with the Bearer token (if available).
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response interceptor
 * Handles global error responses:
 * - If 401 (Unauthorized), removes token and redirects to the login page.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      localStorage.removeItem("token");

      
      if (currentPath !== "/login") {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
