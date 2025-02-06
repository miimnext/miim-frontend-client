"use client";

import { useDispatch } from "react-redux";
import { setTheme } from "@/store/themeSlice";
import { Theme } from "@/enum/common";

export default function ThemeSwitcher() {
  const dispatch = useDispatch();

  /**
   * 切换主题
   */
  const toggleTheme = (value: Theme) => {
    dispatch(setTheme(value)); // 调用 Redux 动作更新主题
  };

  return (
    <>
      {/* 修改 onClick 以确保在点击时执行 toggleTheme */}
      <button onClick={() => toggleTheme(Theme.Light)}>
        {"🌞 Light Mode"}
      </button>
      <button onClick={() => toggleTheme(Theme.Dark)}>{"🌜 Dark Mode"}</button>
      <button onClick={() => toggleTheme(Theme.System)}>
        {"🔄 System Mode"}
      </button>
    </>
  );
}
