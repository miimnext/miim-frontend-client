"use client";
import { useState } from "react";
import { Theme } from "@/enum/common";
import { setCookiesTheme } from "@/utils/cookies";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function ThemeSwitcher() {
  const initTheme = useSelector((state: RootState) => state.theme.theme);
  const [theme, setThemeState] = useState<Theme>(initTheme); // 默认主题

  // 主题切换函数
  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    document.documentElement.setAttribute("data-theme", newTheme);
    setCookiesTheme(newTheme); // 存储到 Cookies
    setThemeState(newTheme); // 更新本地状态
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={theme === Theme.Dark}
        onChange={toggleTheme}
      />
      <div className="w-20 h-10 rounded-full bg-gradient-to-r from-gray-300 to-gray-100 peer-checked:from-gray-600 peer-checked:to-gray-700 transition-all duration-500 items-center flex">
        <div
          className={`absolute  left-1  rounded-full w-8 flex items-center justify-center transition-all duration-500 shadow-md text-lg ${theme === Theme.Dark ? "translate-x-10 bg-gray-600" : "translate-x-0 bg-gray-200"}`}
        >
          {theme === Theme.Dark ? "🌜" : "🌞"}
        </div>
      </div>
    </label>
  );
}
