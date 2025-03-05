import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./authSlice";
import modalReducer from "./modalSlice";
import loadingSlice from "./loadingSlice";

// 🚀 每次请求都创建一个新的 store，避免数据污染
export const createStore = (preloadedState?: { auth: AuthState }) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      modal: modalReducer,
      loading: loadingSlice,
    },
    preloadedState, // ✅ 允许传入初始状态
  });
};

// ✅ 这里不再导出 `store`，而是导出 `createStore`
export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
