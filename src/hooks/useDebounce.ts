import { useCallback } from "react";

/**
 * 自定义防抖 Hook
 * @param callback 需要防抖的函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 防抖后的函数
 */
function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      const handler = setTimeout(() => {
        callback(...args);
      }, delay);

      // 清除定时器
      return () => {
        clearTimeout(handler);
      };
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export default useDebounce;
