import React from "react";
import { User } from "@/types/user"; // 引入你的用户类型
import Avatar from "@/app/[locale]/components/Avatar";
import { Button } from "@/components";

const AuthorInfo = ({ authorInfo }: { authorInfo: User }) => {
  return (
    <div className="px-3  sm:px-8 py-2 shadow-md bg-background-1 my-4 rounded-md">
      <div className="flex items-center mb-4  gap-5 sm:gap-10">
        {/* 头像 */}
        <Avatar avatar={authorInfo.avatar} h={110} w={110} />

        <div>
          <div className="flex items-center gap-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              {authorInfo.username}
            </h2>
            <div>
              <Button size="sm">follow</Button>
            </div>
          </div>
          <div className=" my-2">
            <span className="text-gray-600 "> @ {authorInfo.id}</span>
          </div>
          <div className="flex gap-5 my-2">
            <span>100 likes</span>
            <span>100 follows</span>
          </div>
          <p className="hidden md:block text-sm">
            {
              "暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介"
            }
          </p>
        </div>
      </div>
      <p className="text-sm block  md:hidden">
        {
          "暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介暂无个人简介"
        }
      </p>
    </div>
  );
};

export default AuthorInfo;
