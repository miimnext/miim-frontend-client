// components/CreatePostForm.tsx
"use client";
import CommonApi from "@/api/Common";
import MarkdownEditor from "@/components/MarkdownEditor";
import { RootState } from "@/store";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { createPostParams } from "@/api/type";
import React from "react";
const CreatePostForm = () => {
  const userInfo = useSelector((state: RootState) => state.auth.user) as User;
  const createPost = (content: createPostParams) => {
    const params = {
      ...content,
      author_id: userInfo.id,
    };
    CommonApi.createPost(params).then((res) => {
      console.log(res);
    });
  };
  return <MarkdownEditor createPost={createPost}></MarkdownEditor>;
};

export default React.memo(CreatePostForm);
