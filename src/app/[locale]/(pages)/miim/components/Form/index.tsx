"use client";
// App.tsx
import React from "react";
import { Form } from "@/components";
import { FormItem } from "@/components";
import { Input } from "@/components"; // Example Input component

const App = () => {
  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log("Form Submitted: ", formData);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <div>123</div>
        </FormItem>
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <select name="" id=""></select>
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input />
        </FormItem>
      </Form>
      <div>
        <Input />
      </div>
    </div>
  );
};

export default App;
