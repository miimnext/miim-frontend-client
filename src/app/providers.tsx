"use client";
import { Provider } from "react-redux";
import { createStore } from "@/store"; // Import the store
import { ReactNode, useEffect } from "react";
import { Theme } from "@/enum/common";
import { getUserInfo } from "@/store/authSlice";
import { UnknownAction } from "@reduxjs/toolkit";
interface ProvidersProps {
  children: ReactNode;
  token?: string;
  theme: Theme;
}

const Providers = ({ children, token, theme }: ProvidersProps) => {
  const store = createStore({
    auth: { token: token || null, user: null, isLogin: Boolean(token) }, // Initial auth state
    theme: { theme: theme }, // Initial theme state
  });
  useEffect(() => {
    if (token) {
      store.dispatch(getUserInfo() as unknown as UnknownAction);
    }
    // 在页面卸载时清除状态
  }, [store, token]);
  useEffect(() => {
    // 默认启用浏览器的滚动恢复行为
    window.history.scrollRestoration = "auto";
    // 处理 beforeunload 事件，在页面刷新时控制滚动行为
    const handleBeforeUnload = () => {
      window.history.scrollRestoration = "manual"; // 禁用浏览器的滚动恢复行为
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    // 在组件卸载时清除事件监听器
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
