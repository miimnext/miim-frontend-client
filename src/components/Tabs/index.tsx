"use client";
import { useState } from "react";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActive?: string;
  className?: string;
  layout?: "horizontal" | "vertical";
}

const Tabs = ({
  tabs,
  defaultActive,
  className,
  layout = "horizontal",
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActive || tabs[0]?.key
  );
  const [renderedTabs, setRenderedTabs] = useState<
    Record<string, React.ReactNode>
  >({});

  const containerClass = `w-full flex ${layout === "vertical" ? "flex-row items-start" : "flex-col"} ${className || ""}`;
  const tabListClass = `overflow-auto no-scrollbar ${layout === "vertical" ? "w-1/5 min-w-[150px] border-r border-gray-300" : "border-b border-gray-300"}`;
  const tabContainerClass = `flex ${layout === "vertical" ? "flex-col space-y-2" : "flex-row space-x-2"} p-2`;
  const tabButtonClass = (isActive: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-blue-500 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-200"
    } ${layout === "vertical" ? "text-left w-full" : "text-center"}`;
  const contentClass = "p-4 flex-1 bg-white shadow-md rounded-lg";

  return (
    <div className={containerClass}>
      <div className={tabListClass}>
        <div className={tabContainerClass}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={tabButtonClass(activeTab === tab.key)}
              onClick={() => {
                setActiveTab(tab.key);
                setRenderedTabs((prev) => ({
                  ...prev,
                  [tab.key]: tab.content,
                }));
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className={contentClass}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            style={{ display: activeTab === tab.key ? "block" : "none" }}
          >
            {renderedTabs[tab.key] || tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
