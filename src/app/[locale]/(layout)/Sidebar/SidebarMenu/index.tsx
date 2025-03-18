/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Menu from "@/components/Menu";
import { EventType } from "@/enum/eventType";
import { Link } from "@/i18n/routing";
import eventBus from "@/utils/eventBus";
import Image from "next/image";
import LanguageSwitcher from "../../LanguageSwitcher";
import ThemeSwitcher from "../../ThemeSwitcher";
import { useEffect, useState } from "react";
const SidebarMenu = ({ routes }: { routes: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggleSidebar = (open: boolean) => {
      setIsOpen(open);
    };
    // 订阅 `toggleSidebar` 事件
    eventBus.on(EventType.TOGGLE_SIDEBAR, handleToggleSidebar);
    return () => {
      // 取消订阅
      eventBus.off(EventType.TOGGLE_SIDEBAR, handleToggleSidebar);
    };
  }, []);

  return (
    <>
      {/* 桌面端 Sidebar */}
      <div className="w-[--side-w] h-full sticky top-[--header-height] shadow-md hidden md:block">
        <div className="h-[--main-height] overflow-scroll scroll-container  pt-5 px-2">
          <Menu menuItems={routes} />
        </div>
      </div>

      {/* 移动端 Sidebar 及按钮 */}
      <div className="sm:hidden">
        {/* 侧边栏 */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-background-1 shadow-lg z-[150] transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-[--main-height] overflow-auto  p-4 pt-10">
            {/* Logo */}
            <Link key={"/"} href={"/"} className="h-11 block mb-8">
              <Image
                src={"/images/logo.png"}
                alt={"logo"}
                width={50}
                height={50}
                priority={true}
                className="mx-auto"
              />
            </Link>
            <Menu menuItems={routes} />
            <div className="flex items-center justify-between px-4">
              <span>Theme</span>
              <ThemeSwitcher />
            </div>
            <div className="flex items-center my-3  px-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* 遮罩层，点击关闭菜单 */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-[100]"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default SidebarMenu;
