import Image from "next/image";
import React from "react";
interface AvatarProps {
  avatar: string;
  w?: number;
  h?: number;
}
const Avatar = ({ avatar, w = 30, h = 30 }: AvatarProps) => {
  return (
    <Image
      src={avatar || "/images/post1.png"}
      alt="用户头像"
      width={w}
      height={h}
      priority
      style={{ width: "auto", height: "auto" }} //
      className={`object-cover rounded-full`}
    />
  );
};

export default React.memo(Avatar);
