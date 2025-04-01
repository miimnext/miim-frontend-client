"use client";
import { openModal, openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import { useDispatch } from "react-redux";
import { Button } from "@/components";

export default function Modal() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 p-6">
      <Button
        onClick={() => dispatch(openPersistentModal(ModalEnum.LoginModal))}
      >
        打开登录弹窗
      </Button>

      <Button
        onClick={() => dispatch(openPersistentModal(ModalEnum.SignupModal))}
      >
        打开注册弹窗
      </Button>

      <Button
        onClick={() =>
          dispatch(openModal({ title: "弹窗 3", content: "内容 1" }))
        }
      >
        打开普通弹窗
      </Button>
    </div>
  );
}
