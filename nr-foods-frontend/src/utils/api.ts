import axios from "axios";

const api = axios.create({
  baseURL: "https://nr-foods-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // ✅ FIX (safe)
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;