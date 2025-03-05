"use client";
import { Provider } from "react-redux";
import { createStore } from "@/store";
import { ReactNode, useEffect } from "react";
import { getUserInfo } from "@/store/authSlice";
interface ProvidersProps {
  children: ReactNode;
  token?: string;
}
const Providers = ({ children, token }: ProvidersProps) => {
  const store = createStore({
    auth: { token: token || null, user: null, isLogin: Boolean(token) }, // ✅ 初始状态直接设置好
  });
  useEffect(() => {
    if (token) {
      store.dispatch(getUserInfo());
    }
  }, [store, token]);
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
