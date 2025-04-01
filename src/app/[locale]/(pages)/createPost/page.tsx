"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, FormItem, Input } from "@/components";
import CommonApi from "@/api/Common";
import MyEditor from "../../components/Editor";
import Select from "@/components/Select";
import { FormRef } from "@/components/Form";
import { createPostParams } from "@/api/type";
interface optionsType {
  value: number;
  label: string;
}
function CreatePost() {
  const [tagSelect, setTagSelect] = useState<optionsType[]>([]);
  const [categorys, setCategorys] = useState<optionsType[]>([]);
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
  const formRef = useRef<FormRef>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const formRules = {
    title: [{ required: true, message: "title is required" }],
    category_id: [{ required: true, message: "title is required" }],
    tag_ids: [{ required: true, message: "title is required" }],
  };
  const [editorValue, setEditorValue] = useState<string>("");
  const formData = {
    title: null,
    category_id: null,
    tag_ids: null,
  };
  const handleSubmit = (data: createPostParams) => {
    // 1️⃣ 给 <table> 添加 `border-collapse`

    console.log(data, editorValue);
    CommonApi.createPost({ ...data, content: editorValue }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <div className="shadow-md p-4">
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
          <MyEditor value={editorValue} changeEditor={setEditorValue} />
          <div className="flex justify-end gap-20">
            <FormItem label="" name="submit" className="flex justify-center ">
              <Button>保存</Button>
            </FormItem>
            <FormItem label="" name="submit" className="flex justify-center ">
              <Button disabled={!isFormValid}>发布</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreatePost;
