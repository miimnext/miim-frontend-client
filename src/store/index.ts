// store/index.ts
import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./authSlice";
import modalReducer from "./modalSlice";
import loadingSlice from "./loadingSlice";
import postSlice from "./postSlice";
import themeSlice, { ThemeState } from "./themeSlice";

export const createStore = (preloadedState?: {
  auth: AuthState;
  theme: ThemeState;
}): Store => {
  return configureStore({
    reducer: {
      auth: authReducer,
      modal: modalReducer,
      loading: loadingSlice,
      theme: themeSlice,
      post: postSlice,
    },
    preloadedState,
  });
};

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
