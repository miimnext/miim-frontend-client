"use client";
import { useState } from "react";
import styles from "./CommentSection.module.scss"; // 引入 SCSS 模块

type Comment = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
};

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alice",
      content: "Great post!",
      timestamp: "2025-01-31 10:30",
    },
    {
      id: 2,
      author: "Bob",
      content: "Very informative, thanks!",
      timestamp: "2025-01-31 11:00",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "User", // 这里可以改成真实用户名
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comments</h3>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <p className={styles.commentContent}>
              <strong>{comment.author}:</strong> {comment.content}
            </p>
            <span className={styles.timestamp}>{comment.timestamp}</span>
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
