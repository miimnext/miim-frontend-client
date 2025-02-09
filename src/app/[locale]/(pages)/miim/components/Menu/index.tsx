"use client"
import React from "react";
import Menu from "@/components/Menu"; // Adjust the import path
import { usePathname } from "@/i18n/routing"; // Assuming this is a custom hook for path matching

const Sidebar = () => {
    // You can fetch the `pathname` from the router or a custom hook
    const pathname = usePathname(); // Get the current URL

    // Define the menu structure
    const menuItems = [
        {
            label: "Home",
            path: "/",
            active: pathname === "/",
        },
        {
            label: "About",
            path: "/about",
            active: pathname === "/about",
            subMenu: [
                {
                    label: "Team",
                    path: "/about/team",
                    active: pathname === "/about/team",
                },
                {
                    label: "Company",
                    path: "/about/company",
                    active: pathname === "/about/company",
                },
            ],
        },
        {
            label: "Services",
            path: "/services",
            active: pathname === "/services",
        },
        {
            label: "Contact",
            path: "/contact",
            active: pathname === "/contact",
        },
    ];

    return (
        <div className="flex">
            <Menu menuItems={menuItems} />
            {/* Other content of the page */}
        </div>
    );
};

export default Sidebar;
