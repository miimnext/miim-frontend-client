"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";
import "./MarkdownEditor.scss";
import Button from "../Button";
import Loading from "../Loading";
import Select from "../Select";
import CommonApi from "@/api/Common";
import Form, { FormRef } from "../Form";
import FormItem from "../FormItem";
import Input from "../Input";
import { createPostParams } from "@/api/type";
// 使用 `next/dynamic` 让组件只在客户端加载
const SimpleMDE = dynamic(() => import("react-simplemde-editor"));
interface MarkdownEditorProps {
  createPost: (createPostParams: createPostParams) => void;
}
interface optionsType {
  value: number;
  label: string;
}
const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ createPost }) => {
  const [isOnload, setIsOnload] = useState(false);
  const [content, setContent] = useState("");

  const options = useMemo(
    () => ({
      status: false,
      toolbar: [
        "bold", // 加粗
        "italic", // 斜体
        "heading", // 标题
        "|", // 分隔符
        "quote", // 引用
        "code", // 代码块
        "|", // 分隔符
        "unordered-list", // 无序列表
        "ordered-list", // 有序列表
        "|", // 分隔符
        "link", // 链接
        "image", // 图片
        "|", // 分隔符
        "preview", // 预览
        "side-by-side", // 并排预览
        "fullscreen", // 全屏
      ] as const,
    }),
    []
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // State for form validity
  const formRef = useRef<FormRef>(null);
  const [tagSelect, setTagSelect] = useState<optionsType[]>([]);
  const [categorys, setCategorys] = useState<optionsType[]>([]);
  useEffect(() => {
    setIsOnload(true);
  }, []);
  useEffect(() => {
    CommonApi.GetTags().then((res) => {
      const options = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setTagSelect(options);
    });
    CommonApi.GetCategorys().then((res) => {
      const options = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setCategorys(options);
    });
  }, []);
  const formData = {
    content: "",
    title: "",
    category_id: null,
    tag_ids: [],
  };
  const formRules = {
    title: [{ required: true, message: "title is required" }],
    category_id: [{ required: true, message: "title is required" }],
    tag_ids: [{ required: true, message: "title is required" }],
    content: [
      { required: true, message: "Password is required" },
      { minLength: 6, message: "Must be at least 6 characters" },
    ],
  };
  const handleSubmit = (data: createPostParams) => {
    createPost(data);
  };
  return (
    <div className="p-4">
      {isOnload ? (
        <Form
          onSubmit={handleSubmit}
          form={formData}
          rules={formRules}
          ref={formRef}
          onValidityChange={setIsFormValid}
        >
          <FormItem label="title" name="title">
            <Input className="w-[200px]"></Input>
          </FormItem>
          <FormItem label="category" name="category_id">
            <Select options={categorys} className="w-[200px]"></Select>
          </FormItem>
          <FormItem label="tags" name="tag_ids">
            <Select
              options={tagSelect}
              className="w-[200px]"
              multiple={true}
            ></Select>
          </FormItem>
          <FormItem label="" name="content" customize={true}>
            <SimpleMDE
              value={content}
              onChange={setContent}
              options={options}
            />
          </FormItem>
          <div className="flex justify-end gap-20">
            <FormItem label="" name="submit" className="flex justify-center ">
              <Button>保存</Button>
            </FormItem>
            <FormItem label="" name="submit" className="flex justify-center ">
              <Button disabled={!isFormValid}>发布</Button>
            </FormItem>
          </div>
        </Form>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};
export default MarkdownEditor;
