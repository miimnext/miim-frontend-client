import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "@/enum/common";
import { getCookiesTheme, setCookiesTheme } from "@/utils/cookies";

// 定义 ThemeState 类型
interface ThemeState {
  theme: Theme; // 默认值是 `Theme.System`，避免 SSR 阶段为空或 null
}

// 初始化 Redux state，默认值为 "system" (避免 SSR 中的 null 类型)
const initialState: ThemeState = {
  theme: getCookiesTheme() as Theme,
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // 更新主题的方法
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      setCookiesTheme(action.payload); // 更新 cookie
    },
    // 初始化主题
    initTheme: (state) => {
      const storedTheme = getCookiesTheme();
      if (storedTheme && Object.values(Theme).includes(storedTheme as Theme)) {
        state.theme = storedTheme as Theme; // 从 cookies 获取主题
      } else {
        state.theme = Theme.System; // 默认 "system" 主题
      }
    },
  },
});

// 导出 actions 和 reducer
export const { setTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
