"use client";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import AuthNav from "./AuthNav";
export default function Header() {
  const t = useTranslations();
  return (
    <header className="shadow-md sticky top-0 h-[--header-height] z-[100]">
      <div className="flex justify-between items-center bg-background-1 h-full px-4 sm:px-8">
        <div className="flex items-center">
          <Link key={"/"} href={"/"}>
            <Button>
              <FaHome />
              {t("home")}
            </Button>
          </Link>
        </div>
        <div className="flex gap-10">
          <LanguageSwitcher />
          <ThemeSwitcher></ThemeSwitcher>
          {/* Desktop Navigation */}
          <AuthNav></AuthNav>
        </div>
      </div>
    </header>
  );
}
