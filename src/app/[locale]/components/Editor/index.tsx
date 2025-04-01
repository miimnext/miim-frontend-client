"use client";
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Button } from "@/components";
import CommonApi from "@/api/Common";
import "./editor.scss";

function MyEditor({
  value,
  changeEditor,
}: {
  value: string;
  changeEditor: (html: string) => void;
}) {
  // 编辑器状态
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 初始化编辑器内容
  useEffect(() => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  // 编辑器内容变化时的回调
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    changeEditor(html);
  };

  // 处理图片上传
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await CommonApi.upload(formData);
    if (response?.code === 200) {
      return { data: { link: response.data.filePath } };
    }
    return { data: { link: "" } };
  };

  // 触发文件选择
  const triggerFileInput = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const response = await handleImageUpload(file);
        if (response.data.link) {
          const contentState = editorState.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            { src: response.data.link }
          );
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
          });
          setEditorState(
            EditorState.push(
              newEditorState,
              contentStateWithEntity,
              "insert-fragment"
            )
          );
        }
      }
    };
    inputElement.click();
  };

  return (
    <div>
      {/* 上传按钮 */}
      <Button onClick={triggerFileInput} className="my-2 shadow-md">
        Upload Image
      </Button>

      {/* Draft.js 编辑器 */}
      <div className="min-h-[400px] border border-gray-300 p-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: {
              uploadCallback: handleImageUpload,
              alt: { present: true, mandatory: false },
              defaultSize: { height: "auto", width: "100%" },
            },
          }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      </div>
    </div>
  );
}

export default MyEditor;
