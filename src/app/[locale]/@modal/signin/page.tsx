"use client";
import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import UserApi, { LoginInterface } from "@/api/User";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "@/i18n/routing";
import Modal from "@/components/Modal"; // Import your modal component
import { getUserInfo, initializeAuth } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store"; // Import the AppDispatch type

export default function Login() {
  const router = useRouter();
  const formRef = useRef<FormRef>(null); // Ref to form for validation
  const [isFormValid, setIsFormValid] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const initialFormData: LoginInterface = {
    username: "admin",
    password: "123456",
  };
  const dispatch: AppDispatch = useDispatch(); // Type the dispatch function

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
        dispatch(initializeAuth(res.data.token));
        dispatch(getUserInfo());
        stopLoading();
        hanndleClose();
      }
    });
  };
  const hanndleClose = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace("/");
      window.location.href = "/";
    }
  };
  return (
    <Modal onClose={hanndleClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] mx-auto">
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
          <div>{`Form valid: ${isFormValid ? "Yes" : "No"}`}</div>
        </Form>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            没有账户？{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              注册
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
