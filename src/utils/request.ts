import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

const request = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    console.log("Response received:", response);
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
