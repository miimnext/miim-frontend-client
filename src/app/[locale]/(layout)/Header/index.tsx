"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import LanguageSwitcher from "../LanguageSwitcher"; // 引入 LanguageSwitcher
import { openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaPen } from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";
import { Button } from "@/components";
import { RootState } from "@/store";

const navLinks = [
  { href: "/", label: "首页", icon: <FaHome /> },
  { href: "/miim", label: "UI", icon: <FaHome /> },
  { href: "/createPost", label: "Post", icon: <FaPen /> },
];
export default React.memo(function Header() {
  const t = useTranslations();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();
  return (
    <header className="shadow-md  sticky top-0 h-[--header-height]">
      <div className="flex justify-between items-center  bg-background-1  h-full">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-semibold text-gray-800 mr-8"
          ></Link>
          <div className="text-lg  mr-8">{t("hello")}</div>
        </div>
        <LanguageSwitcher /> {/* 语言切换组件 */}
        <ThemeSwitcher />
        <nav className="flex items-center">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center text-lg text-text-1 hover:bg-gray-100  mx-2 rounded-md "
            >
              <Button>
                {icon}
                {label}
              </Button>
            </Link>
          ))}
          {!isLogin && (
            <>
              <Button
                onClick={() => dispatch(openPersistentModal(ModalEnum.LoginModal))}
              >
                login
              </Button>
              <Button
                onClick={() => dispatch(openPersistentModal(ModalEnum.SignupModal))}
              >
                sign up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
});
