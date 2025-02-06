"use client";
import { Link } from "@/i18n/routing";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss"; // 引入CSS模块
import { openModal, openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import LanguageSwitcher from "../utils/LanguageSwitcher";
import { useTranslations } from "next-intl";
import React from "react";
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/createPost", label: "Post" },
];

export default React.memo(function Header() {
  const dispatch = useDispatch();
  const t = useTranslations();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}></Link>
          {t("hello")}
          <LanguageSwitcher></LanguageSwitcher>
          <nav className={styles.desktopNav}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
            <button
              onClick={() =>
                dispatch(openPersistentModal(ModalEnum.LoginModal))
              }
            >
              打开登录弹窗
            </button>
            <button
              onClick={() =>
                dispatch(openPersistentModal(ModalEnum.SignupModal))
              }
            >
              打开注册弹窗
            </button>
            <button
              onClick={() =>
                dispatch(openModal({ title: "弹窗 3", content: "内容 1" }))
              }
            >
              打开普通弹窗
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
});
