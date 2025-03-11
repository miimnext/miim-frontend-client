"use client";
import React from "react";
import Menu from "@/components/Menu";
const Sidebar = () => {
  const routes = [
    {
      label: "create",
      path: "/createPost",
    },
    {
      label: "miim",
      path: "/miim",
    },
  ];
  return (
    <div className="w-[--side-w] h-full sticky top-[--header-height]  shadow-md">
      <div className="h-[--main-height] overflow-auto">
        <Menu menuItems={routes} />
      </div>
    </div>
  );
};

export default Sidebar;
