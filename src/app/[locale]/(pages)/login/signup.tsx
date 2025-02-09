// import Form from "@/components/utils/Form"; // 导入 Form 组件
// import { ModalEnum } from "@/enum/ModalEnum";
// import { openPersistentModal } from "@/store/modalSlice";
// import { RegEx } from "@/utils/regex";
// import { useDispatch } from "react-redux";
// import { FieldType } from "@/components/utils/Form/types";
// export default function Login() {
//   const dispatch = useDispatch();
//   const fields = [
//     {
//       name: "username",
//       label: "账号",
//       type: FieldType.Text, // 类型限定为 'email'
//       required: true,
//       validate: RegEx.emailRegEx,
//     },
//     {
//       name: "password",
//       label: "密码",
//       type: FieldType.Password, // 类型限定为 'password'
//       required: true,
//       validate: RegEx.passwordRegEx,
//     },
//   ];

//   // 提交表单的函数
//   const handleSubmit = async (data: { [key: string]: string }) => {
//     // console.log("Form submitted:", data);
//     await setTimeout(() => {
//       console.log(data);
//     }, 3000);
//     // 在这里处理表单提交（如调用 API 登录等）
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
//       <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
//         注册账户
//       </h2>
//       <Form fields={fields} onSubmit={handleSubmit} />
//       <div className="mt-4 text-center">
//         <div className="text-sm text-gray-600">
//           已有账号{" "}
//           <div
//             className="text-blue-600 hover:underline cursor-pointer"
//             onClick={() => dispatch(openPersistentModal(ModalEnum.LoginModal))}
//           >
//             登陆
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
