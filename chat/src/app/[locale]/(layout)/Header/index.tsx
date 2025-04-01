"use client";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import React from "react";

export default React.memo(function Header() {
  return (
    <header className="shadow-md sticky top-0 h-[--header-height]">
      <div className="flex justify-between items-center bg-background-1 h-full px-4 sm:px-8">
        {/* 语言切换组件 */}
        <LanguageSwitcher />
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </header>
  );
});
