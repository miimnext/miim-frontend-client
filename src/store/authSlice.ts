import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token?: string | null;
  user?: object | null;
  isLogin?: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handlerUserLogin: (
      state,
      action: PayloadAction<{ token: string; user: object | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLogin = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLogin = false;
    },
    initializeAuth: (state, action: PayloadAction<string | undefined>) => {
      const token = action.payload;
      if (token) {
        state.token = token;
        state.isLogin = true;
      }
    },
  },
});

export const { handlerUserLogin, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
