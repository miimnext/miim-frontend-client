"use client";
import { Link } from "@/i18n/routing";
import React, { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export interface MenuItemProps {
  label: string;
  path: string;
  subMenu?: MenuItemProps[];
  active?: boolean;
  className?: string;
}

const MenuItem = ({
  label,
  path,
  subMenu,
  active,
  className,
}: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // 防止 `Link` 跳转
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center justify-between  px-4 py-2 rounded-md transition-all 
          hover:bg-gray-200 cursor-pointer text-text-1 ${
            active ? "font-bold" : ""
          } ${isOpen && subMenu ? "bg-gray-100" : ""} ${className}`}
      >
        {subMenu ? (
          <p
            onClick={toggleMenu}
            className={`cursor-pointer transition-all flex justify-between w-full items-center`}
          >
            {label}
            {isOpen ? (
              <FaChevronUp className="w-4 h-4" />
            ) : (
              <FaChevronDown className="w-4 h-4" />
            )}
          </p>
        ) : (
          <Link href={path} className=" flex-1">
            {label}
          </Link>
        )}
      </div>

      {subMenu && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out  text-md"
          style={{
            maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          }}
        >
          <div>
            {subMenu.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                path={item.path}
                active={active}
                subMenu={item.subMenu}
                className="pl-8"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
