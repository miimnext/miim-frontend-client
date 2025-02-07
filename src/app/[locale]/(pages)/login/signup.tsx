import Form from "@/app/components/utils/Form"; // 导入 Form 组件
export default function Login() {
  const fields = [
    {
      name: "email",
      label: "邮箱",
      type: "email" as "email", // 类型限定为 'email'
      required: true,
      validate: (value: string) =>
        !/\S+@\S+\.\S+/.test(value) ? "Email is invalid" : null,
    },
    {
      name: "password",
      label: "密码",
      type: "password" as "password", // 类型限定为 'password'
      required: true,
      validate: (value: string) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  ];

  // 提交表单的函数
  const handleSubmit = (data: { [key: string]: string }) => {
    console.log("Form submitted:", data);
    // 在这里处理表单提交（如调用 API 登录等）
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        注册账户
      </h2>
      <Form fields={fields} onSubmit={handleSubmit} />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          已有账号{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            登录
          </a>
        </p>
      </div>
    </div>
  );
}
