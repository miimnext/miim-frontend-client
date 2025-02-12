"use client";

import React, { useState, useEffect, useRef } from "react";

interface VirtualScrollerProps<T> {
  data: T[];
  itemHeight: number | ((index: number) => number); // 支持动态行高
  renderItem: (item: T, index: number) => React.ReactNode; // 渲染每项的函数
  bufferSize?: number; // 缓冲区大小，默认是 5
}

interface ScrollPosition {
  scrollTop: number;
  viewportHeight: number;
  totalHeight: number;
}

const VirtualScroller = <T,>({
  data,
  itemHeight,
  renderItem,
}: VirtualScrollerProps<T>) => {
  const [visibleItems, setVisibleItems] = useState<T[]>([]); // 当前可见项
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollTop: 0,
    viewportHeight: 0,
    totalHeight:
      data.length * (typeof itemHeight === "number" ? itemHeight : 40), // 默认总高度
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // 计算每一项的高度（支持动态行高）
  const calculateItemHeight = (index: number) => {
    return typeof itemHeight === "number" ? itemHeight : itemHeight(index);
  };

  // 更新可视区域的内容
  useEffect(() => {
    const start = Math.floor(scrollPosition.scrollTop / calculateItemHeight(0));
    const end = Math.min(
      data.length,
      Math.ceil(
        (scrollPosition.scrollTop + scrollPosition.viewportHeight) /
          calculateItemHeight(0)
      )
    );
    console.log("start:", start, "end:", end); // 打印 start 和 end，确保它们的值正确
    setVisibleItems(data.slice(start, end));
  }, [scrollPosition, data]);

  // 滚动处理
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      console.log("scrollTop:", scrollTop, "clientHeight:", clientHeight); // 打印滚动位置和视口高度
      setScrollPosition((prev) => ({
        ...prev,
        scrollTop,
        viewportHeight: clientHeight,
      }));
    }
  };

  // 确保高度计算是正确的
  useEffect(() => {
    const totalHeight = data.reduce(
      (acc, _, index) => acc + calculateItemHeight(index),
      0
    );
    console.log("totalHeight:", totalHeight); // 打印 totalHeight 确保它计算正确
    setScrollPosition((prev) => ({
      ...prev,
      totalHeight,
    }));
  }, [data, itemHeight]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: "400px", overflowY: "auto", position: "relative" }}
    >
      <div style={{ height: scrollPosition.totalHeight }}>
        {visibleItems.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: calculateItemHeight(0) * index, // 每项的 top 值
              height: calculateItemHeight(index), // 每项的高度
              width: "100%",
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualScroller;
