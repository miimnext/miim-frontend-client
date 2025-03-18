"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust this import to match your store configuration
import Avatar from "../../components/Avatar";
import AvatarUpload from "./components/AvatarUpload";
import UserApi from "@/api/User";
import { getUserInfo } from "@/store/authSlice";
import { UnknownAction } from "@reduxjs/toolkit";
const Profile = () => {
  const { user, isLogin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  // 骨架图状态：如果没有用户数据或未登录，显示骨架图
  if (!user || !isLogin) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="shadow-md rounded-md p-4">
          <div className="flex items-center justify-center">
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-full animate-pulse" />
          </div>
          <div className="text-center mt-4">
            <div className="w-40 h-6 bg-gray-300 rounded-md animate-pulse mx-auto" />
          </div>
          <div className="mt-8">
            <div className="space-y-4">
              <div className="w-60 h-5 bg-gray-300 rounded-md animate-pulse" />
              <div className="w-60 h-5 bg-gray-300 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAvatarUploadSuccess = (url: string) => {
    setAvatarUrl(url);
    UserApi.UpdateUserInfo({ avatar: url }).then((res) => {
      if (res.code === 200) {
        dispatch(getUserInfo() as unknown as UnknownAction);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="shadow-md rounded-md p-4">
        <div className="flex items-center justify-center">
          <AvatarUpload onUploadSuccess={handleAvatarUploadSuccess}>
            <Avatar
              avatar={avatarUrl ? avatarUrl : user.avatar}
              h={100}
              w={100}
            />
          </AvatarUpload>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-medium">{user.nickName}</h2>
        </div>
        <div className="mt-8">
          <div className="space-y-4">
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Joined:</strong> {user.created_at}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
