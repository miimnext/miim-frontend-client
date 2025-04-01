"use client";
import CommonApi from "@/api/Common";
import useAuthClick from "@/hooks/useAuthClick";
import { Link } from "@/i18n/routing";
import { RootState } from "@/store";
import React, { useState } from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegCommentAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

type LikeDislikeButtonProps = {
  likes: number;
  id: number;
  comment_count: number;
  ReactionType: string;
};

const LikeDislikeButton = ({
  likes,
  id,
  comment_count,
  ReactionType,
}: LikeDislikeButtonProps) => {
  const [initLikes, setInitLikes] = useState(likes);
  const [reaction, setReaction] = useState(ReactionType);
  const { user } = useSelector((state: RootState) => state.auth);
  const handlePostReaction = (reaction_type: number) => {
    let newReaction = "none"; // 默认未反应状态
    let likeChange = 0;
    // 确保 reaction 从后端获取，表示当前用户的状态
    const currentReaction = reaction; // 假设 reaction 是从 props 或 state 中获取的

    if (currentReaction === "like" && reaction_type === 1) {
      // 取消点赞
      newReaction = "none";
      likeChange = -1;
    } else if (currentReaction === "like" && reaction_type === -1) {
      // 点赞 → 点踩
      newReaction = "dislike";
      likeChange = -2;
    } else if (currentReaction === "dislike" && reaction_type === -1) {
      // 取消点踩
      newReaction = "none";
      likeChange = 1;
    } else if (currentReaction === "dislike" && reaction_type === 1) {
      // 点踩 → 点赞
      newReaction = "like";
      likeChange = 2;
    } else if (currentReaction === "none" && reaction_type === 1) {
      // 初次点赞
      newReaction = "like";
      likeChange = 1;
    } else if (currentReaction === "none" && reaction_type === -1) {
      // 初次点踩
      newReaction = "dislike";
      likeChange = -1;
    }

    // 执行后端请求
    CommonApi.PostReaction({
      post_id: id,
      reaction_type: reaction_type,
      user_id: user.id,
    })
      .then(() => {
        // 后端请求成功后更新 UI 状态
        setInitLikes(initLikes + likeChange);
        setReaction(newReaction);
      })
      .catch((err) => {
        console.error("Failed to update reaction:", err);
        // 如果请求失败，可以添加一些错误提示或回滚 UI 状态
      });
  };

  return (
    <div className="flex space-x-4 text-gray-600 dark:text-gray-400 text-sm">
      <button
        onClick={useAuthClick(() => {
          handlePostReaction(1);
        })}
        aria-label="Like this post"
        className={`flex items-center justify-center border-1 p-2 rounded-full transition-all ease-in-out duration-200 shadow-md hover:shadow-lg
      ${reaction === "like" && "border-blue-600 bg-blue-100 text-blue-600"}`}
      >
        <FaRegThumbsUp className="h-4 w-4" />
      </button>

      <span className="font-medium flex items-center justify-center">
        {initLikes}
      </span>
      <button
        onClick={useAuthClick(() => {
          handlePostReaction(-1);
        })}
        aria-label="Dislike this post"
        className={`flex items-center justify-center border-1 p-2 rounded-full transition-all ease-in-out duration-200 shadow-md hover:shadow-lg
       ${reaction === "dislike" && "border-red-600 bg-red-100 text-red-600"}`}
      >
        <FaRegThumbsDown className="h-4 w-4" />
      </button>
      <button
        className={`flex items-center justify-center border-1 p-2 rounded-full transition-all ease-in-out duration-200 shadow-md hover:shadow-lg`}
      >
        <Link
          href={`/post/${id}`}
          prefetch={false}
          className="flex items-center gap-2"
        >
          <FaRegCommentAlt className="h-4 w-4"></FaRegCommentAlt>
          {comment_count}
        </Link>
      </button>
    </div>
  );
};

export default LikeDislikeButton;
