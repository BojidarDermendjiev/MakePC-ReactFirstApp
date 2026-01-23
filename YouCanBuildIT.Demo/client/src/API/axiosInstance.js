import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  withCredentials: true, // Enable cookie-based authentication
});

instance.interceptors.request.use((config) => {
  if (API_KEY) config.headers["X-API-KEY"] = API_KEY;
  // Tokens are now sent via HTTP-only cookies, no need for Authorization header
  return config;
});

export default instance;
