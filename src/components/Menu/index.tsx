"use client";
import React from "react";
import { usePathname } from "@/i18n/routing";
import MenuItem, { MenuItemProps } from "../MenuItem";

interface CollapsibleMenuProps {
  menuItems: MenuItemProps[];
}

const Menu = ({ menuItems }: CollapsibleMenuProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          label={item.label}
          path={item.path}
          active={isActive(item.path)}
          subMenu={item.subMenu}
        />
      ))}
    </>
  );
};

export default Menu;
