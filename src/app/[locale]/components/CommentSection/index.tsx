"use client";
import { useCallback, useEffect, useState } from "react";
import CommonApi from "@/api/Common";
import { Comments } from "@/types/post";
import useAuthClick from "@/hooks/useAuthClick";
import { Button, Input } from "@/components";
import dayjs from "dayjs";

export default function CommentSection({ id }: { id: string }) {
  const [comments, setComments] = useState<Comments[]>([]);

  const getList = useCallback(() => {
    CommonApi.GetCommentsByID(id).then((res) => {
      setComments(res.data.list);
    });
  }, [id]);

  useEffect(() => {
    getList();
  }, [getList]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    CommonApi.CreateComments(id, newComment).then((res) => {
      setComments([res.data, ...comments]);
    });
    setNewComment("");
  };

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="flex gap-2 mb-2">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <Button onClick={useAuthClick(handleAddComment)}>Submit</Button>
      </div>
      <ul className="list-none p-0 mb-4">
        {comments.map((comment) => (
          <li
            key={comment.ID}
            className="bg-white p-2 rounded-md shadow-sm mb-2"
          >
            <p className="text-sm text-gray-800">
              <strong>{comment.author.username}:</strong> {comment.content}
            </p>
            <span className="text-xs text-gray-500">
              {dayjs(comment.CreatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
