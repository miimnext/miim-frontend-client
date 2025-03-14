import { useEffect } from "react";

function useDisableScroll() {
  useEffect(() => {
    const originalOverflow = window.document.documentElement.style.overflow;
    const originalPaddingRight =
      window.document.documentElement.style.paddingRight;

    // 计算滚动条宽度，防止页面抖动
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      window.document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.document.documentElement.style.overflow = "hidden";

    return () => {
      window.document.documentElement.style.overflow = originalOverflow;
      window.document.documentElement.style.paddingRight = originalPaddingRight;
    };
  }, []);
}

export default useDisableScroll;
