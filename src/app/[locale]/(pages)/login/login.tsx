import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import { ModalEnum } from "@/enum/ModalEnum";
import { openPersistentModal, closePersistentModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import UserApi, { LoginInterface } from "@/api/User";
import { useLoading } from "@/hooks/useLoading";

import { AppDispatch } from "@/store";
import UserInit from "@/hooks/useUserInit";
// import useUserInit from "@/hooks/useUserInit";
export default function Login() {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormRef>(null); // Ref to form for validation
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const { startLoading, stopLoading } = useLoading(); // Loading hook
  // Initial form data
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
      console.log(res);

      if (res.data) {
        UserInit(res.data.token);
        dispatch(closePersistentModal());
        stopLoading();
      }
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
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
      {/* <Button onClick={() => handleSubmit()}>登录</Button> */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          没有账户？{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => dispatch(openPersistentModal(ModalEnum.SignupModal))}
          >
            注册
          </span>
        </div>
      </div>
    </div>
  );
}
