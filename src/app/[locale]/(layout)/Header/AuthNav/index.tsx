import { useRouter } from "@/i18n/routing";
import { RootState } from "@/store";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPenNib, FaFortAwesomeAlt, FaCaretDown } from "react-icons/fa";
import useOutsideClick from "@/hooks/useOutsideClick";
import { logout } from "@/store/authSlice";
import { Button } from "@/components";
export default function AuthNav() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 控制下拉菜单的显示
  const dropdownRef = useRef<HTMLDivElement>(null); // 用于检测点击外部
  // 未登录时的导航项
  const GuestNav = [
    {
      label: "signin",
      path: "/signin",
      icon: null,
    },
    {
      label: "sign up",
      path: "/signup",
      icon: null,
    },
  ];

  // 登录后的导航项
  const UserNav = [
    {
      label: "create",
      path: "/createPost",
      icon: <FaPenNib />,
    },
    {
      label: "profile",
      path: "/profile",
      icon: null,
    },
    {
      label: "settings",
      path: "/settings",
      icon: null,
    },
    {
      label: "logout",
      path: "/logout",
      icon: null,
    },
  ];
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));
  // 处理导航点击
  const handleNavigate = useCallback(
    (path: string) => {
      if (path !== "/logout") {
        router.push(path, { scroll: false });
      } else {
        dispatch(logout());
      }
      setIsDropdownOpen(false); // 导航后关闭下拉菜单
    },
    [router, dispatch]
  );
  // 渲染导航按钮
  const renderNavButtons = (
    navItems: { label: string; path: string; icon: React.ReactNode | null }[]
  ) => {
    return navItems.map(({ label, path, icon }) => (
      <Button key={path} onClick={() => handleNavigate(path)}>
        {icon && icon} {label}
      </Button>
    ));
  };
  return (
    <div className="relative flex gap-4" ref={dropdownRef}>
      {isLogin ? (
        <>
          <Button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="gap-2 h-full"
          >
            <FaFortAwesomeAlt />
            <FaCaretDown />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-gray-200 border border-gray-100 rounded-lg shadow-lg">
              {UserNav.map(({ label, path, icon }) => (
                <div
                  key={path}
                  className="px-4 py-2 hover:bg-gray-300 cursor-pointer flex  items-center gap-3"
                  onClick={() => handleNavigate(path)}
                >
                  {icon && icon} {label}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        renderNavButtons(GuestNav)
      )}
    </div>
  );
}
