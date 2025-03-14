"use client";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import AuthNav from "./AuthNav";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import eventBus from "@/utils/eventBus";
import { EventType } from "@/enum/eventType";

export default function Header() {
  return (
    <header className="shadow-md sticky top-0 h-[--header-height] z-[100] bg-background-1">
      <div className="flex justify-between items-center h-full max-w-[--max-w-main] mx-auto px-5">
        <div className="flex items-center ">
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-2xl"
            onClick={() => eventBus.emit(EventType.TOGGLE_SIDEBAR, true)}
          >
            <FaBars></FaBars>
          </button>
          {/* Logo */}
          <Link key={"/"} href={"/"} className="h-11 ml-5">
            <Image
              src={"/images/logo.png"}
              alt={"logo"}
              width={50}
              height={50}
              priority={true}
              className="h-full w-full"
            />
          </Link>
        </div>
        {/* 桌面端功能按钮 */}
        <div className="flex gap-10 items-center">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
