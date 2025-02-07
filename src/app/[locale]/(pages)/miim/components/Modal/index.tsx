"use client";
import { openModal, openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import { useDispatch } from "react-redux";

export default function Modal() {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 p-6">
            <button
                onClick={() =>
                    dispatch(openPersistentModal(ModalEnum.LoginModal))
                }
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
                打开登录弹窗
            </button>

            <button
                onClick={() =>
                    dispatch(openPersistentModal(ModalEnum.SignupModal))
                }
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
            >
                打开注册弹窗
            </button>

            <button
                onClick={() =>
                    dispatch(openModal({ title: "弹窗 3", content: "内容 1" }))
                }
                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300"
            >
                打开普通弹窗
            </button>
        </div>
    );
}
