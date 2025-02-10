"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  closeModal,
  closePersistentModal,
  initializePersistentModal,
  openModal,
} from "@/store/modalSlice";
import { useEffect } from "react";
import styles from "./Modal.module.scss";
import ModalMaps from "./ModalMaps";
import React from "react";

export default function ModalWrapper() {
  const dispatch = useDispatch();
  // 从 Redux store 获取 modalList 和 persistentModal
  const modalList = useSelector((state: RootState) => state.modal.modalList);
  const persistentModal = useSelector(
    (state: RootState) => state.modal.persistentModal
  );
  // 组件加载时初始化持久化模态框
  useEffect(() => {
    dispatch(initializePersistentModal());
  }, [dispatch]);
  // 根据 persistentModal 类型选择模态框组件
  const SelectedModal = persistentModal ? ModalMaps[persistentModal] : null;

  return (
    <>
      {/* 渲染持久化模态框 */}
      {persistentModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => dispatch(closePersistentModal())} // 点击背景关闭持久化模态框
        >
          <div onClick={(e) => e.stopPropagation()}>
            {SelectedModal && <SelectedModal /> /* 渲染选中的持久化模态框 */}
          </div>
        </div>
      )}
      {/* 渲染普通模态框 */}
      {modalList.length > 0 && (
        <>
          {modalList.map((modal, index) => (
            <div
              key={index}
              className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => dispatch(closeModal(index))} // 点击背景关闭模态框
            >
              <div
                className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
                onClick={(e) => e.stopPropagation()} // 阻止点击内容区域关闭模态框
              >
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                  {modal.title}
                </h2>
                <p className="text-gray-600 mb-6">{modal.content}</p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      dispatch(
                        openModal({ title: "弹窗 4", content: "内容 2" })
                      )
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
      )}
    </>
  );
}
