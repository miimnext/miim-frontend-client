import { Theme } from "@/enum/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = { theme: Theme.Dark };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
