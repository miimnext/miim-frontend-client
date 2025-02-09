// app/dashboard/layout.tsx
import SideBar from "./components/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            {/* 左侧菜单 */}
            <SideBar />

            {/* 右侧内容区域 */}
            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>
        </div>
    );
}
