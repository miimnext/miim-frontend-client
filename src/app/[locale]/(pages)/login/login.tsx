import React, { useState, useRef } from "react";
import { Button, FormItem, Input } from "@/components";
import Form, { FormRef } from "@/components/Form";
import { ModalEnum } from "@/enum/ModalEnum";
import { openPersistentModal, closePersistentModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import UserApi, { LoginInterface } from "@/api/User";
import { useLoading } from "@/hooks/useLoading";
import { handlerUserLogin } from "@/store/authSlice";
import { setToken } from "@/utils/cookies";

export default function Login() {
  const dispatch = useDispatch();
  const formRef = useRef<FormRef>(null); // Ref to form for validation
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const { startLoading, stopLoading } = useLoading(); // Loading hook

  // Initial form data
  const initialFormData: LoginInterface = {
    username: "",
    password: "",
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
    const { token, data } = await UserApi.login(payload);
    if (token) {
      setToken(token);
      dispatch(handlerUserLogin({ token, user: data }));
      dispatch(closePersistentModal());
      stopLoading();
    } else {
      console.error("Login failed: user data is null");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        登录账户
      </h2>
      <Form // Pass the LoginInterface type here
        form={initialFormData}
        onSubmit={handleSubmit}
        ref={formRef}
        rules={formRules}
        onValidityChange={setIsFormValid} // Pass the callback to track form validity
      >
        <FormItem label="用户名" name="username">
          <Input />
        </FormItem>
        <FormItem label="密码" name="password">
          <Input type="password" />
        </FormItem>
        <FormItem label="" name="" className="flex justify-center">
          {/* Disable the button if the form is invalid */}
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
            onClick={() => dispatch(openPersistentModal(ModalEnum.SignupModal))}
          >
            注册
          </span>
        </div>
      </div>
    </div>
  );
}
