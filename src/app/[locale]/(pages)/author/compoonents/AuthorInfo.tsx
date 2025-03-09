import React, { useEffect, useState } from "react";
import { User } from "@/types/user"; // 引入你的用户类型
import UserApi from "@/api/User"; // 引入API请求模块

type AuthorInfoProps = {
  userInfo: any; // 从父组件传入的用户名
};

const AuthorInfo = (userInfo: AuthorInfoProps) => {
  //   const [author, setAuthor] = useState<User | null>(null);
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string>("");

  //   useEffect(() => {
  //     const fetchAuthorInfo = async () => {
  //       setLoading(true);
  //       setError("");

  //       try {
  //         const response = await UserApi.getUserInfo(username); // 假设有一个API请求根据用户名获取作者信息
  //         setAuthor(response.data); // 设置获取到的作者数据
  //       } catch (err) {
  //         setError("无法获取作者信息");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchAuthorInfo();
  //   }, [username]);

  return (
    <div className="author-info p-4 border rounded-lg shadow-md">
      <div className="author-info-header flex items-center gap-3 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{123123}</h2>
          <p className="text-gray-600">@{123123}</p>
        </div>
      </div>
      <p className="text-gray-700">{"暂无个人简介"}</p>
    </div>
  );
};

export default AuthorInfo;
