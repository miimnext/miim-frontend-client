"use client";
import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import UserApi, { LoginInterface } from "@/api/User";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "@/i18n/routing";
import Modal from "@/components/Modal"; // Import your modal component
import { getUserInfo, initializeAuth } from "@/store/authSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import useToast from "@/hooks/useToast";
import { UnknownAction } from "@reduxjs/toolkit";

export default function Login() {
  const router = useRouter();
  const formRef = useRef<FormRef>(null); // Ref to form for validation
  const [isFormValid, setIsFormValid] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const dispatch: AppDispatch = useDispatch();
  const { showToast } = useToast();
  const initialFormData: LoginInterface = {
    username: "admin",
    password: "123456",
  };

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
    await UserApi.register(payload).then((res) => {
      if (res.code == 200) {
        dispatch(initializeAuth(res.data.token));
        dispatch(getUserInfo() as unknown as UnknownAction);
        hanndleClose();
        stopLoading();
      } else {
        stopLoading();
        showToast(res.message, "error", 3000);
      }
    });
  };
  const hanndleClose = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.replace("/");
      location.href = "/";
    }
  };
  return (
    <Modal onClose={hanndleClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          注册账户
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
              注册
            </Button>
          </FormItem>
          <div>{`Form valid: ${isFormValid ? "Yes" : "No"}`}</div>
        </Form>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            没有账户？{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              登录
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
