"use client";
import { Link } from "@/i18n/routing";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Define the MenuItemProps type
export interface MenuItemProps {
    label: string;
    path: string;
    subMenu?: MenuItemProps[]; // Recursive type for submenus
    active: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, path, subMenu, active }) => {
    const [isOpen, setIsOpen] = useState(false); // State for showing/hiding submenus
    const [height, setHeight] = useState(0); // To dynamically set the height for animation
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev); // Toggle submenu visibility
    };

    useEffect(() => {
        if (contentRef.current) {
            // Set the height of the submenu content for the animation
            setHeight(contentRef.current.scrollHeight); // Get the full height of the submenu
        }
    }, [isOpen]);

    return (
        <div className="space-y-2">
            <div
                className={`flex items-center justify-between p-2 cursor-pointer rounded-md hover:bg-gray-100 ${active ? "bg-blue-500 text-white" : "text-gray-700"}`}
                onClick={toggleMenu}
            >
                <Link href={path} className="flex-1">{label}</Link>
                {subMenu && (
                    <button className="ml-2">
                        {isOpen ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {/* Render Submenu if exists and open */}
            {subMenu && (
                <div
                    ref={contentRef}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                        maxHeight: isOpen ? `${height}px` : "0px", // Dynamic height based on content
                    }}
                >
                    <div className="pl-4">
                        {subMenu.map((item) => (
                            <MenuItem
                                key={item.label}
                                label={item.label}
                                path={item.path}
                                active={active}
                                subMenu={item.subMenu}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuItem;
