import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { connectWebSocket, closeWebSocket } from "@/utils/websocket";
import { removeToken } from "@/utils/cookies";

interface AuthState {
  token?: string | null;
  user: User;
  isLogin: boolean;
}

const initialState: AuthState = {
  token: null,
  user: {
    id: "",
    username: "",
  },
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      removeToken();
      closeWebSocket();
      state.token = null;
      state.user = {
        id: "",
        username: "",
      };
      state.isLogin = false;
    },
    initializeAuth: (state, action: PayloadAction<string | undefined>) => {
      const token = action.payload;
      if (token) {
        state.token = token;
        state.isLogin = true;
      }
    },
    initializeUserinfo: (state, action: PayloadAction<{ data: User }>) => {
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
      connectWebSocket(action.payload.data.id);
    },
  },
});

export const { logout, initializeAuth, initializeUserinfo } = authSlice.actions;
export default authSlice.reducer;
