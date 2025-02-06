// src/utils/cookies.ts
import Cookies from "js-cookie";

// 获取主题，默认值为 "system"
export const getCookiesTheme = (): string => {
  return Cookies.get("theme") || "system"; // 如果 cookie 中没有主题，返回 "system"
};

// 设置主题到 Cookie 中
export const setCookiesTheme = (theme: string): void => {
  Cookies.set("theme", theme, { expires: 365 }); // 设置主题并将其存储 365 天
};

// 删除主题 Cookie
export const removeCookiesTheme = (): void => {
  Cookies.remove("theme");
};
