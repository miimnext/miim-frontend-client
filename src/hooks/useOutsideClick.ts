import { useEffect } from "react";

// 修改useOutsideClick的类型
function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    if (ref) {
      const handleClickOutside = (e: MouseEvent) => {
        // 类型断言：将 ref.current 断言为 HTMLElement
        if (ref.current && !ref.current.contains(e.target as Node)) {
          callback();
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [ref, callback]);
}

export default useOutsideClick;
