import axios, { AxiosResponse } from "axios";
import { getToken } from "./cookies";
import { createStore } from "@/store";
import { logout } from "@/store/authSlice";
import { useRouter } from "@/i18n/routing"; // 如果需要跳转到登录页
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

const request = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
request.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    const { code } = response.data as { code: number };
    // 401 错误时，只触发登出逻辑，不直接做 UI 处理
    if (code === 401) {
      createStore().dispatch(logout());
      // 如果有必要，可以在这里使用 Next.js 路由跳转到登录页
      const router = useRouter();
      router.push("/login"); // 跳转到登录页
    }
    return response.data; // 只返回数据
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
