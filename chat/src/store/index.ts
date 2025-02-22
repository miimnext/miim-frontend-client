import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import counterReducer from "./counterSlice";
import modalReducer from "./modalSlice";
import loadingSlice from "./loadingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    modal: modalReducer,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
