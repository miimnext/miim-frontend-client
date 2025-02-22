"use client";
import React from "react";
import Menu from "@/components/Menu";
import componentsMaps from "..";
export default function Menus() {
  const routes = Object.keys(componentsMaps).map((item) => {
    return {
      label: item,
      path: "/miim/" + item,
    };
  });
  return (
    <div className="w-64 h-full sticky top-[40px] bg-white shadow-md">
      <div className=" overflow-auto">
        <Menu menuItems={routes} />
      </div>
    </div>
  );
}
