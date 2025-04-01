import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import counterReducer from "./counterSlice";
import modalReducer from "./modalSlice";
import loadingSlice from "./loadingSlice";
import ChatListSlice from "./ChatListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    modal: modalReducer,
    loading: loadingSlice,
    chatList: ChatListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
