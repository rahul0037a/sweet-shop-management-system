import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://sweet-shop-backend.onrender.com/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
