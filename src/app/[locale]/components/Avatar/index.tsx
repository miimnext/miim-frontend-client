import Image from "next/image";
import React from "react";
interface AvatarProps {
  avatar: string;
  w?: number;
  h?: number;
}
const Avatar = ({ avatar, w, h }: AvatarProps) => {
  return (
    <Image
      src={avatar || "/images/post1.png"} // 如果用户有头像，使用头像，否则使用默认图片。
      alt="用户头像" // 为了可访问性，给图片添加 alt 描述文字
      width={w || 30} // 设置图片的宽度为 30px
      height={h || 30} // 设置图片的高度为 30px
      priority={true} // 如果图片需要优先加载，设置为 true
      className="object-cover rounded-full" // 使用 object-cover 保证图片按比例缩放填充区域，rounded-full 让图片变成圆形
    />
  );
};

export default React.memo(Avatar);
