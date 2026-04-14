import axios from "axios";

const api = axios.create({
  baseURL: "http://3.90.190.155:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;