"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import nlp from "compromise";

// Dynamically import only the necessary components from WangEditor
const Editor = dynamic(
  () => import("@wangeditor/editor-for-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const Toolbar = dynamic(
  () => import("@wangeditor/editor-for-react").then((mod) => mod.Toolbar),
  {
    ssr: false,
  }
);

function MyEditor() {
  const [editor, setEditor] = useState<string | null>(null); // TS 语法
  const [html, setHtml] = useState<string | null>(null); // TS 语法

  // 工具栏配置
  const toolbarConfig = {}; // TS 语法

  // 编辑器配置
  const editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        server: "/api/upload",
        fieldName: "file",
      },
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        {/* Ensure the components are loaded properly */}
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
}

export default MyEditor;
