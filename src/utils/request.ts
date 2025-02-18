import axios, { AxiosResponse } from "axios";
import { getToken } from "./cookies";
import { store } from "@/store";
import { logout } from "@/store/authSlice";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

const request = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor
request.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config);
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    // You can modify the config here (e.g., add Authorization header, etc.)
    return config;
  },
  (error) => {
    console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    const responseData = response.data as { data: { code: number } };
    if (responseData.data.code == 401) {
      return store.dispatch(logout());
    }
    return response.data; // 直接返回 response.data
  },
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
