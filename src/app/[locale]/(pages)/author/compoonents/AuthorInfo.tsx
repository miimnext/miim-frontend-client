import React from "react";
import { User } from "@/types/user"; // 引入你的用户类型
import Image from "next/image";

const AuthorInfo = ({ authorInfo }: { authorInfo: User }) => {
  return (
    <div className="author-info p-4 border rounded-lg shadow-md bg-background-1 my-4">
      <div className="author-info-header flex items-center gap-3 mb-4">
        {/* 头像 */}
        <Image
          src={authorInfo.avatar}
          alt={`${authorInfo.username} 的头像`}
          width={20}
          height={20}
          priority={true}
          className="w-12 h-12 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {authorInfo.username}
          </h2>
          <p className="text-gray-600">@ {authorInfo.id}</p>
        </div>
      </div>
      <p className="text-gray-700">{"暂无个人简介"}</p>
    </div>
  );
};

export default AuthorInfo;
