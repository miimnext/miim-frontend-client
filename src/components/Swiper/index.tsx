"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";

interface CustomSwiperProps {
  children: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  autoplayDelay?: number;
}

const Swiper: React.FC<CustomSwiperProps> = ({
  children,
  slidesPerView = 1,
  spaceBetween = 10,
  autoplayDelay = 3000,
}) => {
  const childrenArray = React.Children.toArray(children);
  const slideCount = childrenArray.length;

  // 动态调整滑块列表，实现无缝滚动
  const slides = [
    childrenArray[slideCount - 1],
    ...childrenArray,
    childrenArray[0],
  ];
  const adjustedSlideCount = slides.length;

  const [currentSlide, setCurrentSlide] = useState<number>(1); // 从第二个滑块开始
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev + 1 >= adjustedSlideCount) {
        // 跳转到第二个滑块（原始的第一个滑块）
        return 1;
      }
      return prev + 1;
    });
  }, [adjustedSlideCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev - 1 < 0) {
        // 跳转到倒数第二个滑块（原始的最后一个滑块）
        return adjustedSlideCount - 2;
      }
      return prev - 1;
    });
  }, [adjustedSlideCount]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX !== null) {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (deltaX > 50) {
        prevSlide();
      } else if (deltaX < -50) {
        nextSlide();
      }

      setStartX(null);
    }
  };

  const handleInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  useEffect(() => {
    if (!isPaused && autoplayDelay) {
      timerRef.current = setInterval(nextSlide, autoplayDelay);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplayDelay, adjustedSlideCount, isPaused, nextSlide]);

  // 监听 currentSlide 的变化，实现无缝跳转
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      if (currentSlide === adjustedSlideCount - 1) {
        // 跳转到第二个滑块（原始的第一个滑块）
        container.style.transition = "none";
        setCurrentSlide(1);
      } else if (currentSlide === 0) {
        // 跳转到倒数第二个滑块（原始的最后一个滑块）
        container.style.transition = "none";
        setCurrentSlide(adjustedSlideCount - 2);
      } else {
        // 恢复过渡效果
        container.style.transition = "transform 0.5s ease-in-out";
      }
    }
  }, [currentSlide, adjustedSlideCount]);

  // 计算每张幻灯片的宽度
  const slideWidth = `calc((100% - ${spaceBetween * (slidesPerView - 1)}px) / ${slidesPerView})`;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex transition-transform"
        style={{
          transform: `translateX(-${(100 / slidesPerView) * currentSlide}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((child, index) => (
          <div
            className="flex-shrink-0"
            key={index}
            style={{
              width: slideWidth,
              marginRight:
                index < adjustedSlideCount - 1 ? `${spaceBetween}px` : "0",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      <span
        onClick={() => {
          prevSlide();
          handleInteraction();
        }}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded"
      >
        Prev
      </span>

      <span
        onClick={() => {
          nextSlide();
          handleInteraction();
        }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded"
      >
        Next
      </span>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: slideCount }).map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index + 1)} // 跳转到对应的滑块
            className={`w-2 h-2 rounded-full ${
              index === currentSlide - 1 ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Swiper);
