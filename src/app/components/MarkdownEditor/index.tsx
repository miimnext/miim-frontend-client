import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import styles from "./MarkdownEditor.module.scss"; // 引入CSS模块用于样式
import MarkdownToolbar from "./MarkdownToolbar"; // 引入Markdown工具栏组件
import { useResizeEditor } from "./utils/useResizeEditor"; // 引入自定义的编辑器大小调整钩子
import { markdownToHtml } from "./utils/markdownToHtml"; // 引入Markdown转HTML的工具函数

export default function MarkdownEditor() {
  // 存储用户输入的Markdown文本
  const [markdown, setMarkdown] = useState<string>("");

  // 控制暗黑模式的开关
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // 使用useRef获取对DOM元素的引用
  const editorRef = useRef<HTMLTextAreaElement>(null); // 获取文本编辑区域的引用
  const previewRef = useRef<HTMLDivElement>(null); // 获取预览区域的引用
  const containerRef = useRef<HTMLDivElement>(null); // 获取容器区域的引用

  // 处理Markdown编辑框内容变化的回调函数
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMarkdown(e.target.value); // 更新markdown状态
    },
    [] // 该回调不依赖任何外部状态
  );

  // 切换暗黑模式
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev); // 取反当前的暗黑模式状态
  }, []);

  // 插入Markdown文本（如加粗、斜体等）的函数
  const insertText = useCallback(
    (before: string, after: string, moveToNewLine = true) => {
      const editor = editorRef.current;
      if (!editor) return;
      const start = editor.selectionStart; // 获取选中文本的起始位置
      const end = editor.selectionEnd; // 获取选中文本的结束位置
      const selectedText = markdown.substring(start, end); // 获取选中的文本
      const value = editor.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1; // 当前行的起始位置
      const lineEnd = value.indexOf("\n", start); // 当前行的结束位置
      const currentLine = value
        .substring(lineStart, lineEnd === -1 ? value.length : lineEnd)
        .trim(); // 当前行的文本

      let newText = "";
      let newCursorPos = 0;

      if (selectedText) {
        // 如果有选中文本，则加上插入的Markdown文本
        newText =
          markdown.substring(0, start) +
          before +
          selectedText +
          after +
          markdown.substring(end);
        newCursorPos =
          start + before.length + selectedText.length + after.length; // 更新光标位置
      } else {
        // 如果没有选中文本，则直接插入Markdown文本
        const prefix = moveToNewLine && currentLine !== "" ? "\n" : ""; // 如果当前行非空，插入换行符
        newText =
          markdown.substring(0, start) +
          prefix +
          before +
          after +
          markdown.substring(end);
        newCursorPos = start + prefix.length + before.length; // 更新光标位置
      }

      setMarkdown(newText); // 更新Markdown内容

      requestAnimationFrame(() => {
        if (editor) {
          editor.setSelectionRange(newCursorPos, newCursorPos); // 更新光标位置
          editor.focus(); // 聚焦到编辑器
        }
      });
    },
    [markdown] // 当markdown变化时，重新创建该回调函数
  );

  // 使用useMemo缓存Markdown转换为HTML的结果
  const htmlContent = useMemo(
    () => markdownToHtml(markdown, styles), // 传入样式对象以便转换时使用
    [markdown] // 当markdown内容变化时重新计算HTML
  );

  // 使用useEffect在HTML内容变化时更新预览区域
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = htmlContent; // 将生成的HTML内容注入到预览区域
    }
  }, [htmlContent]); // 当htmlContent变化时重新执行

  // 使用自定义的useResizeEditor钩子来实现编辑器大小调整功能
  const separatorRef = useResizeEditor(editorRef, previewRef, containerRef);

  return (
    <div
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } flex flex-col h-screen shadow-lg`}
      ref={containerRef} // 将容器元素的引用传递给containerRef
    >
      <MarkdownToolbar
        insertText={insertText} // 将insertText函数传递给MarkdownToolbar
        toggleDarkMode={toggleDarkMode} // 将toggleDarkMode函数传递给MarkdownToolbar
        isDarkMode={isDarkMode} // 将当前暗黑模式状态传递给MarkdownToolbar
      />
      <div className="flex flex-col md:flex-row h-full">
        <textarea
          ref={editorRef} // 将文本编辑器的引用传递给editorRef
          id="editor"
          className="w-full md:w-1/2 p-4 bg-transparent border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={markdown} // 将当前的markdown状态值传递给textarea
          onChange={handleInput} // 在输入框内容变化时调用handleInput
          placeholder="输入Markdown..."
        />
        <div
          ref={separatorRef} // 用于调整大小的分隔符
          className="hidden md:block w-px bg-gray-300 cursor-ew-resize"
        />
        <div
          ref={previewRef} // 将预览区域的引用传递给previewRef
          id="preview"
          className="w-full md:w-1/2 h-full overflow-auto border border-gray-300 rounded-md p-4 bg-gray-50"
        />
      </div>
    </div>
  );
}
