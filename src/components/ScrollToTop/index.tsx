// ScrollToTop.tsx
"use client";

import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    // 在客户端加载后，滚动到页面顶部
    window.scrollTo(0, 0);
  }, []);

  return null; // 这个组件不需要渲染任何东西
};

export default ScrollToTop;
