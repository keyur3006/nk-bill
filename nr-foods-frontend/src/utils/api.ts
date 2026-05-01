import axios from "axios";

const api = axios.create({
  baseURL: "https://api.keyurbill.online/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ❌ Payment routes ma token na moklo
  if (
    token &&
    !config.url?.includes("/payment/create-order") &&
    !config.url?.includes("/payment/verify")
  ) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;