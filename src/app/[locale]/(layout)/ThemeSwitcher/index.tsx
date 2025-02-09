"use client";
import { Theme } from "@/enum/common";
import { setCookiesTheme } from "@/utils/cookies";
export default function ThemeSwitcher() {
  // 切换主题的函数
  const toggleTheme = (value: Theme) => {
    if (document.documentElement.getAttribute("data-theme") === value) return; // 如果当前主题已经是 value，则不执行
    // const themeStylesheet = document.getElementById("theme-stylesheet") as HTMLLinkElement;
    // // 更新样式表
    // if (themeStylesheet) {
    //   themeStylesheet.href = `/styles/${value}.css`; // 动态设置样式
    // }
    // 更新 data-theme 属性
    document.documentElement.setAttribute("data-theme", value);
    // 设置 Cookies 存储主题
    setCookiesTheme(value);
  };

  return (
    <div className="flex gap-4 p-4 justify-center ">
      <button
        onClick={() => toggleTheme(Theme.Light)}
        className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300"
      >
        🌞 Light Mode
      </button>

      <button
        onClick={() => toggleTheme(Theme.Dark)}
        className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300"
      >
        🌜 Dark Mode
      </button>

      <button
        onClick={() => toggleTheme(Theme.System)}
        className="px-4 py-2 font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        🔄 System Mode
      </button>
    </div>
  );
}
