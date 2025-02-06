import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  return (
    <>
      <div>11111111111</div>
      <button
        onClick={() =>
          dispatch(openModal({ title: "弹窗 4", content: "内容 2" }))
        }
      >
        关闭普通模态框
      </button>
    </>
  );
}
