/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openModal, closeModal } from "@/store/modalSlice";
import React from "react";

export default function ModalWrapper() {
  const dispatch = useDispatch();
  const modalList = useSelector((state: RootState) => state.modal.modalList);

  return (
    <>
      {/* Render regular modals */}
      {modalList.length > 0 &&
        modalList.map((modal: any, index: any) => (
          <div
            key={index}
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => dispatch(closeModal(index))}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                {modal.title}
              </h2>
              <p className="text-gray-600 mb-6">{modal.content}</p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    dispatch(openModal({ title: "弹窗 4", content: "内容 2" }))
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  打开更多
                </button>

                <button
                  onClick={() => dispatch(closeModal(index))}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
