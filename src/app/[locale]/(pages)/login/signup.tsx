import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import { ModalEnum } from "@/enum/ModalEnum";
import { openPersistentModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const formRef = useRef<FormRef>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // State for form validity

  const formData = {
    username: "",
    password: "",
  };

  const formRules = {
    username: [{ required: true, message: "Username is required" }],
    password: [
      { required: true, message: "Password is required" },
      { minLength: 6, message: "Must be at least 6 characters" },
    ],
  };

  // Submit form function
  const handleSubmit = async (data: {
    [key: string]: string | string[];
  }): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Form submitted successfully with data:", data);
        resolve();
      }, 2000); // Simulate 2 seconds delay
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        注册账户
      </h2>
      <Form
        form={formData}
        onSubmit={handleSubmit}
        ref={formRef}
        rules={formRules}
        onValidityChange={setIsFormValid} // Pass the callback
      >
        <FormItem label="用户名" name="username">
          <Input></Input>
        </FormItem>
        <FormItem label="密码" name="password">
          <Input type="password"></Input>
        </FormItem>
        <FormItem label="" name="">
          {/* Disable the button if the form is invalid */}
          <Button disabled={!isFormValid}>注册</Button>
        </FormItem>
        <div>{`Form valid: ${isFormValid ? "Yes" : "No"}`}</div>
      </Form>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          已有账户？{" "}
          <div
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => dispatch(openPersistentModal(ModalEnum.LoginModal))}
          >
            登录
          </div>
        </div>
      </div>
    </div>
  );
}
