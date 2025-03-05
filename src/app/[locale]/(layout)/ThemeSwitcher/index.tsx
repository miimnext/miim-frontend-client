"use client";
import { Button } from "@/components";
import { Theme } from "@/enum/common";
import { setCookiesTheme } from "@/utils/cookies";
export default function ThemeSwitcher() {
  // 切换主题的函数
  const toggleTheme = (value: Theme) => {
    if (document.documentElement.getAttribute("data-theme") === value) return; // 如果当前主题已经是 value，则不执行
    document.documentElement.setAttribute("data-theme", value);
    // 设置 Cookies 存储主题
    setCookiesTheme(value);
  };
  return (
    <div className="flex gap-4 justify-center pt-6">
      <Button onClick={() => toggleTheme(Theme.Light)}>🌞 Light Mode</Button>
      <Button onClick={() => toggleTheme(Theme.Dark)}>🌜 Dark Mode</Button>
    </div>
  );
}
