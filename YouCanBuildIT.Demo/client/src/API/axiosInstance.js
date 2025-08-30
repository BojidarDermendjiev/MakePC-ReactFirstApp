import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create();

instance.interceptors.request.use((config) => {
  if (API_KEY) config.headers["X-API-KEY"] = API_KEY;
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default instance;
