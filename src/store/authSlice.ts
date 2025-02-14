import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
interface AuthState {
  token?: string | null;
  user?: User | null;
  isLogin: boolean;
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
    initializeUserinfo: (state, action: PayloadAction<{ data: User }>) => {
      console.log(123123);

      localStorage.setItem("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
    },
  },
});

export const { logout, initializeAuth, initializeUserinfo } = authSlice.actions;
export default authSlice.reducer;
