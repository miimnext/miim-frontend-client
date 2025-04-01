"use client";
import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import UserApi, { LoginInterface } from "@/api/User";
import { useLoading } from "@/hooks/useLoading";
import UserInit from "@/hooks/useUserInit";
import { useRouter } from "@/i18n/routing";
import useToast from "@/hooks/useToast";

export default function Login() {
  const router = useRouter();
  const formRef = useRef<FormRef>(null); // Ref to form for validation
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const { startLoading, stopLoading } = useLoading(); // Loading hoo
  const { showToast } = useToast();
  const initialFormData: LoginInterface = {
    username: "admin",
    password: "123456",
  };

  // Form validation rules
  const formRules = {
    username: [{ required: true, message: "Username is required" }],
    password: [
      { required: true, message: "Password is required" },
      { minLength: 6, message: "Password must be at least 6 characters" },
    ],
  };

  // Handle form submission
  const handleSubmit = async (payload: LoginInterface) => {
    startLoading();
    await UserApi.login(payload).then((res) => {
      if (res.code == 200) {
        stopLoading();
        UserInit(res.data.token);
        router.push("/chat");
        showToast(res.message, "success");
      } else {
        stopLoading();
        showToast(res.message, "error");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-[--main-height] ">
      <div className="w-full  max-w-[500px] mx-auto rounded-lg  p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          登录账户
        </h2>
        <Form
          form={initialFormData}
          onSubmit={handleSubmit}
          ref={formRef}
          rules={formRules}
          onValidityChange={setIsFormValid}
        >
          <FormItem label="用户名" name="username">
            <Input />
          </FormItem>
          <FormItem label="密码" name="password">
            <Input type="password" />
          </FormItem>
          <FormItem label="" name="" className="flex justify-center">
            <Button disabled={!isFormValid} className="w-full">
              登录
            </Button>
          </FormItem>
        </Form>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            没有账户？{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                router.push("/login/register");
              }}
            >
              注册
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
