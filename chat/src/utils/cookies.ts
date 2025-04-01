import Cookies from "js-cookie";
const tokeyKey = "SSSID";
// 获取主题色
export const getCookiesTheme = (): string => {
  return Cookies.get("theme") || "system";
};

// 设置主题色
export const setCookiesTheme = (theme: string): void => {
  Cookies.set("theme", theme, { expires: 365 });
};

export const getToken = () => {
  return Cookies.get(tokeyKey);
};
export const setToken = (token: string) => {
  return Cookies.set(tokeyKey, token);
};

export const removeToken = () => {
  return Cookies.remove(tokeyKey);
};
