"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // 使用正确的导入
import { Locale } from "@/enum/locales";
import React from "react";
import Button from "@/components/Button";

// 按钮的公共样式

export default React.memo(function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // 获取当前语言，如果 pathname 为空则默认为第一个语言
  const currentLocale = pathname?.split("/")[1] as Locale;

  // 切换语言的函数
  const changeLocale = (locale: Locale) => {
    // 如果当前语言与选择的语言相同，则不做任何处理
    if (currentLocale === locale) return;

    // 如果 pathname 为空，则直接跳转到新语言的根路径
    const newPathname = pathname
      ? pathname.replace(/^\/[^/]+/, `/${locale}`)
      : `/${locale}`;
    router.push(newPathname);
  };

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={() => changeLocale(Locale.zh)}>中文</Button>
      <Button onClick={() => changeLocale(Locale.en)}>English</Button>
    </div>
  );
});
