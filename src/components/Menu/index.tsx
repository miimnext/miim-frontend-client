import React from "react";
import { usePathname } from "@/i18n/routing"; // Use custom hook to get current pathname
import MenuItem, { MenuItemProps } from "../MenuItem"; // Ensure consistent import

interface CollapsibleMenuProps {
    menuItems: MenuItemProps[];  // Make sure this uses the same MenuItemProps
}

const Menu: React.FC<CollapsibleMenuProps> = ({ menuItems }) => {
    const pathname = usePathname(); // Get current path from usePathname

    const isActive = (path: string) => pathname === path; // Check if current path matches menu item

    return (
        <div className="w-64 bg-white shadow-md border-r">
            <div className="p-4 space-y-4">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.label}
                        label={item.label}
                        path={item.path}
                        active={isActive(item.path)}
                        subMenu={item.subMenu}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
