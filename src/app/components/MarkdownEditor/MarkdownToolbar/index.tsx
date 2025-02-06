// MarkdownToolbar.tsx
import React from "react";
import styles from "./MarkdownToolbar.module.scss"; // 引入CSS模块

type MarkdownToolbarProps = {
  insertText: (before: string, after: string, moveToNewLine?: boolean) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
};

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({
  insertText,
  toggleDarkMode,
  isDarkMode,
}) => {
  return (
    <div className={styles.toolbar}>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("**", "**")}
      >
        <strong>B</strong>
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("*", "*")}
      >
        <em>I</em>
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("# ", " ")}
      >
        H1
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("[链接文字](", ")")}
      >
        Link
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("![图片描述](", ")")}
      >
        Img
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("```\n", "\n```")}
      >
        Code
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("- ", " ")}
      >
        List
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => insertText("> ", " ")}
      >
        Quote
      </button>
      <button className={styles.toolbarButton} onClick={toggleDarkMode}>
        {isDarkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default MarkdownToolbar;
