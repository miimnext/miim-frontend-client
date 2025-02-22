"use client";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import { RootState } from "@/store";
import { Button } from "@/components";
import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import React from "react";

export default React.memo(function Header() {
  const t = useTranslations();

  const navLinks = [
    { href: "/", label: t("home"), icon: <FaHome /> },
    { href: "/chat", label: "chat", icon: <FaHome />, needLogin: true },
  ];
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="shadow-md sticky top-0 h-[--header-height]">
      <div className="flex justify-between items-center bg-background-1 h-full px-4 sm:px-8">
        <div className="flex items-center">
          {navLinks.map(({ href, label, icon, needLogin }) => (
            <Link
              key={href}
              href={href}
              needLogin={needLogin}
              className="flex items-center text-text-1 hover:bg-gray-100 mx-2 rounded-md"
            >
              <Button>
                {icon}
                {label}
              </Button>
            </Link>
          ))}
        </div>
        <LanguageSwitcher /> {/* 语言切换组件 */}
        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <Button onClick={toggleMobileMenu} className="text-xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </Button>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center">
          {!isLogin && (
            <>
              <Button
                onClick={() =>
                  dispatch(openPersistentModal(ModalEnum.LoginModal))
                }
              >
                login
              </Button>
              <Button
                onClick={() =>
                  dispatch(openPersistentModal(ModalEnum.SignupModal))
                }
              >
                sign up
              </Button>
            </>
          )}
        </nav>
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-background-1 p-4 sm:hidden">
            {!isLogin && (
              <>
                <Button
                  onClick={() =>
                    dispatch(openPersistentModal(ModalEnum.LoginModal))
                  }
                >
                  login
                </Button>
                <Button
                  onClick={() =>
                    dispatch(openPersistentModal(ModalEnum.SignupModal))
                  }
                >
                  sign up
                </Button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
});
