import Image from "next/image";
import React from "react";

interface AvatarProps {
  avatar: string;
  w?: number;
  h?: number;
}

const Avatar = ({ avatar, w = 30, h = 30 }: AvatarProps) => {
  return (
    <div
      style={{ width: w, height: h }}
      className="relative overflow-hidden rounded-full"
    >
      {avatar ? (
        <Image
          src={avatar}
          alt="用户头像"
          width={w}
          height={h}
          priority
          style={{ objectFit: "contain" }} // 确保图片填充容器且保持比例
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default React.memo(Avatar);
