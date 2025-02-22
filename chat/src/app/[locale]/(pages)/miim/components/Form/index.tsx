"use client";
import React, { useRef, useState } from "react";
import { Form, Button } from "@/components";
import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import { TextArea } from "@/components/Textarea";
import Select from "@/components/Select";
import { FormRef } from "@/components/Form";

const App = () => {
  const formRef = useRef<FormRef>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // State for form validity

  const formData = {
    username: "",
    password: "",
    description: "",
    sex: "1",
    sex2: ["1", "2", "3"],
  };

  // ✅ 规则统一定义在 Form 里
  const formRules = {
    username: [{ required: true, message: "Username is required" }],
    password: [
      { required: true, message: "Password is required" },
      { minLength: 6, message: "Must be at least 6 characters" },
    ],
  };

  const handleSubmit = (data: { [key: string]: string | string[] }) => {
    console.log("Form Submitted: ", data);
  };

  return (
    <div className="p-4">
      <Form
        onSubmit={handleSubmit}
        form={formData}
        rules={formRules}
        ref={formRef}
        onValidityChange={setIsFormValid}
      >
        <FormItem label="Username" name="username">
          <Input />
        </FormItem>

        <FormItem label="Password" name="password">
          <Input type="password" />
        </FormItem>

        <FormItem label="Description" name="description">
          <TextArea />
        </FormItem>
        <FormItem label="单选" name="sex">
          <Select
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
            ]}
          />
        </FormItem>
        <FormItem label="多选" name="sex2">
          <Select
            options={[
              { label: "Admin", value: "1" },
              { label: "Editor", value: "2" },
              { label: "Viewer", value: "3" },
            ]}
            multiple={true}
          />
        </FormItem>

        <FormItem label="" name="submit" className="flex justify-center ">
          <Button disabled={!isFormValid} className="w-full">
            123
          </Button>
        </FormItem>

        <div></div>
      </Form>
    </div>
  );
};

export default App;
