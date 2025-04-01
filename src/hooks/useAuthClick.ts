import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "@/i18n/routing";

// useAuthClick 自定义 Hook：用于封装鉴权逻辑和事件处理
const useAuthClick = (
  clickHandler?: React.MouseEventHandler<Element>, // 可选的原始点击事件处理函数
  loginPath = "/signin" // 默认跳转的登录路径
) => {
  const router = useRouter(); // 获取路由对象
  const isLogin = useSelector((state: RootState) => state.auth.isLogin); // 从 Redux 状态中获取登录状态

  // 使用 useCallback 来 memoize 事件处理函数，避免不必要的重新渲染
  const handleClick = useCallback(
    (event: React.MouseEvent<Element>) => {
      if (!isLogin) {
        event.preventDefault(); // 阻止默认行为，避免执行原本的点击事件
        event.stopPropagation(); // 阻止事件冒泡，防止触发父元素的事件处理
        router.push(loginPath, { scroll: false }); // 如果用户未登录，跳转到登录页
      } else if (clickHandler) {
        clickHandler(event); // 如果用户已登录，执行传入的原始点击事件处理函数
      }
    },
    [clickHandler, isLogin, loginPath, router] // 依赖项：只在这些依赖项发生变化时重新生成 handleClick
  );

  return handleClick; // 返回处理点击事件的函数
};

export default useAuthClick;
