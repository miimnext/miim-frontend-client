import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UserApi from "@/api/User";
import { User } from "@/types/user";
import { setToken, removeToken } from "@/utils/cookies";

export const getUserInfo = createAsyncThunk<User, void>(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserApi.userinfo();
      return response.data; // return the data here
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

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
      location.replace("/");
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
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        // handle error case
        console.error(action.payload); // log the error
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
