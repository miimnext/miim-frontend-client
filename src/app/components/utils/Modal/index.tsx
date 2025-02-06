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
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // 阻止点击内容区域关闭模态框
          >
            {SelectedModal && <SelectedModal />} {/* 渲染选中的持久化模态框 */}
          </div>
        </div>
      )}
      {/* 渲染普通模态框 */}
      {modalList.length > 0 && (
        <>
          {modalList.map((modal, index) => (
            <div
              key={index}
              className={styles.modalBackdrop}
              style={{ zIndex: 4000 + index }}
              onClick={() => dispatch(closeModal(index))} //
            >
              <div
                // 使用 index 作为 key（这里使用 index 只是示例，生产环境可以改用唯一的 id）
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()} // 阻止点击内容区域关闭模态框
              >
                <h2>{modal.title}</h2>
                <p>{modal.content}</p>
                <button
                  onClick={() =>
                    dispatch(openModal({ title: "弹窗 4", content: "内容 2" }))
                  }
                >
                  关闭普通模态框
                </button>
                <button onClick={() => dispatch(closeModal(index))}>
                  关闭普通模态框
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
