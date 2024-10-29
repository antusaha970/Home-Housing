import axios from "axios";
const client = axios.create({
  // baseURL: "https://home-housing-backend.vercel.app",
  baseURL: "http://127.0.0.1:8000",
});

client.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("user_token");
    if (token) {
      token = JSON.parse(token);
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
