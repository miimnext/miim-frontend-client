"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const MySwiper = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setImages([
      "/images/wajueji.png",
      "/images/wajueji.png",
      "/images/wajueji.png",
    ]);
    setLoading(false);
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <div className="flex space-x-2">
          <div className="w-full h-60 bg-button-bg-1 animate-pulse rounded-lg"></div>
          <div className="w-full h-60 bg-button-bg-1 animate-pulse rounded-lg hidden  sm:block"></div>
          <div className="w-full h-60 bg-button-bg-1 animate-pulse rounded-lg hidden  lg:block"></div>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={8}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // 基于 Tailwind 的屏幕尺寸断点配置
            640: {
              slidesPerView: 2, // sm 及更小屏幕时显示 2 个幻灯片
            },
            768: {
              slidesPerView: 2, // md 屏幕时显示 2 个幻灯片
            },
            1024: {
              slidesPerView: 3, // lg 屏幕时显示 3 个幻灯片
            },
            1280: {
              slidesPerView: 3, // xl 屏幕时显示 3 个幻灯片
            },
          }}
          style={{ boxSizing: "border-box" }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-60">
                <Image
                  src={src || "/images/post1.png"}
                  alt={`轮播图 ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  priority={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MySwiper;
