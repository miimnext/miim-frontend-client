import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UserApi from "@/api/User";
import { User } from "@/types/user";
import { setToken, removeToken } from "@/utils/cookies";

// Async thunk to fetch user info
export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  const response = await UserApi.userinfo();
  return response.data;
});

export interface AuthState {
  token: string | null;
  user: User | null;
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
      removeToken();
      state.token = null;
      state.user = null;
      state.isLogin = false;
    },
    initializeAuth: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      if (token) {
        setToken(token);
        state.token = token;
        state.isLogin = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
