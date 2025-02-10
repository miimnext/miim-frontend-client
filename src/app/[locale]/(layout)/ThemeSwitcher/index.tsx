"use client";
import { Button } from "@/components";
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
    <div className="flex gap-4  justify-center ">
      <Button onClick={() => toggleTheme(Theme.Light)}>🌞 Light Mode</Button>
      <Button onClick={() => toggleTheme(Theme.Dark)}>🌜 Dark Mode</Button>
      <Button onClick={() => toggleTheme(Theme.System)}>🔄 System Mode</Button>
    </div>
  );
}
