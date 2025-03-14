"use client";
import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import UserApi, { LoginInterface } from "@/api/User";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "@/i18n/routing";
import Modal from "@/components/Modal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { getUserInfo, initializeAuth } from "@/store/authSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import useDisableScroll from "@/hooks/useDisableScroll";
import useSafeBack from "@/hooks/useSafeBack"; // Adjust the import path

export default function Login() {
  useDisableScroll();
  const safeBack = useSafeBack();
  const router = useRouter();
  const formRef = useRef<FormRef>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const initialFormData: LoginInterface = {
    username: "admin",
    password: "123456",
  };
  const dispatch = useDispatch<AppDispatch>();
  const formRules = {
    username: [{ required: true, message: "Username is required" }],
    password: [
      { required: true, message: "Password is required" },
      { minLength: 6, message: "Password must be at least 6 characters" },
    ],
  };

  const handleSubmit = async (payload: LoginInterface) => {
    startLoading();
    await UserApi.login(payload).then((res) => {
      if (res.code == 200) {
        dispatch(initializeAuth(res.data.token));
        dispatch(getUserInfo() as unknown as UnknownAction);
        stopLoading();
        location.replace("/");
      }
    });
  };

  return (
    <Modal onClose={safeBack}>
      <div
        className={`flex flex-col justify-center items-center  w-screen  p-0 `}
      >
        <div className="w-full sm:max-w-md bg-white  shadow-lg p-6  h-screen  sm:h-auto rounded-none sm:rounded-lg  flex sm:block flex-col justify-center ">
          <div
            onClick={safeBack}
            className="cursor-pointer fixed top-0 right-0 p-6  sm:hidden"
          >
            关闭
          </div>
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
              <Input className="w-full" />
            </FormItem>
            <FormItem label="密码" name="password">
              <Input type="password" className="w-full" />
            </FormItem>
            <FormItem label="" name="" className="flex justify-center">
              <Button disabled={!isFormValid} className="w-full">
                登录
              </Button>
            </FormItem>
            <div className="text-center text-sm text-gray-600">
              {`Form valid: ${isFormValid ? "Yes" : "No"}`}
            </div>
          </Form>
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">
              没有账户？
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                注册
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
