"use client";
import React from "react";
import Menu from "@/components/Menu"; // Adjust the import path
import componentsMaps from "../components";
const Sidebar = () => {
  const routes = Object.keys(componentsMaps).map((item) => {
    return {
      label: item,
      path: "/miim/" + item,
    };
  });
  return (
    <div className="w-64 h-full sticky top-[--header-height] bg-white shadow-md">
      <div className="h-[--main-height] overflow-auto">
        <Menu menuItems={routes} />
      </div>
    </div>
  );
};

export default Sidebar;
