"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./CommentSection.module.scss"; // 引入 SCSS 模块
import CommonApi from "@/api/Common";
import { Comments } from "@/types/post";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
export default function CommentSection({ id }: { id: string }) {
  const [comments, setComments] = useState<Comments[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
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
    const newCommentObj: Comments = {
      ID: comments.length + 1,
      author: user, // 这里可以改成真实用户名
      content: newComment,
      CreatedAt: new Date().toLocaleString(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comments</h3>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.ID} className={styles.commentItem}>
            <p className={styles.commentContent}>
              <strong>{comment.author.username}:</strong> {comment.content}
            </p>
            <span className={styles.timestamp}>{comment.CreatedAt}</span>
          </li>
        ))}
      </ul>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className={styles.inputField}
        />
        <button onClick={handleAddComment} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}
