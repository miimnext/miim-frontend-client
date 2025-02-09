import { useEffect, useRef } from "react";
import Loading from "@/components/Loading";
type InfiniteScrollProps = {
  onLoad: () => void; // 加载更多数据的函数
  isLoading: boolean; // 是否正在加载中
  hasMore: boolean; // 是否还有更多数据
  children: React.ReactNode; // 要包裹的子元素
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoad,
  isLoading,
  hasMore,
  children,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 确保只有在元素可见并且没有正在加载时才触发loadMore
        if (entry.isIntersecting && !isLoading && hasMore) {
          console.log("Load more triggered"); // 用于调试，检查loadMore是否被调用
          onLoad(); // 当元素可见时触发加载更多数据
        }
      },
      {
        rootMargin: "100px", // 在元素进入视口前100px时触发加载
        threshold: 0.5, // 当触发元素的50%可见时触发
      }
    );

    const triggerElement = triggerRef.current;
    if (triggerElement) {
      observer.observe(triggerElement); // 开始观察触发元素
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement); // 组件卸载时清理观察器
      }
    };
  }, [isLoading, hasMore, onLoad]);

  return (
    <div>
      {children}
      <div ref={triggerRef} className="text-center">
        {isLoading ? (
          <Loading /> // 显示加载中
        ) : hasMore ? (
          <p>向下滚动以加载更多...</p> // 提示用户向下滚动
        ) : (
          <p>没有更多数据可以加载。</p> // 提示用户没有更多数据
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
