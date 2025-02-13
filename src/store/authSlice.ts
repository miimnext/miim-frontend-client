import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UserApi from "@/api/User";

// Async thunk to fetch user info
const initUserInfo = createAsyncThunk("auth/fetchUserInfo", async () => {
  const response = await UserApi.userinfo();
  console.log(response, 123123);

  return response.data;
});

interface AuthState {
  token?: string | null;
  user?: object | null;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogin = true; // User info successfully fetched, user is logged in
      })
      .addCase(initUserInfo.rejected, (state) => {
        state.isLogin = false; // Handle error, possibly logout
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export { initUserInfo };
export default authSlice.reducer;
