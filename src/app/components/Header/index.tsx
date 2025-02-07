"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import LanguageSwitcher from "../utils/LanguageSwitcher";  // 引入 LanguageSwitcher

import { FaHome, FaPen } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "首页", icon: <FaHome /> },
  { href: "/createPost", label: "Post", icon: <FaPen /> },
];
export default
  React.memo(function Header() {
    const t = useTranslations();

    return (
      <header className=" shadow-md py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-800 mr-8">
              Logo
            </Link>
            <div className="text-lg text-gray-600 mr-8">{t("hello")}</div>
          </div>

          <LanguageSwitcher /> {/* 语言切换组件 */}

          <nav className="flex items-center">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center ml-6 text-lg text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-md transition-all duration-200 hover:translate-y-[-3px]"
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  });
