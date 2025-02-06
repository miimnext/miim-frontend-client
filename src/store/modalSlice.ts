import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalConfig } from "@/types/modal";
import { ModalEnum } from "@/enum/ModalEnum";

interface ModalState {
  modalList: ModalConfig[]; // 存储所有打开的普通模态框
  persistentModal: ModalEnum | null; // 存储持久化模态框，只有一个
}

const initialState: ModalState = {
  modalList: [], // 初始化为空
  persistentModal: null, // 初始化没有持久化模态框
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // 打开普通模态框（可以有多个）
    openModal: (state, action: PayloadAction<ModalConfig>) => {
      state.modalList.push(action.payload); // 将新模态框加入 modalList
    },

    // 关闭普通模态框（通过索引）
    closeModal: (state, action: PayloadAction<number>) => {
      console.log(123123123);

      state.modalList.splice(action.payload, 1); // 通过索引移除 modalList 中的模态框
    },

    // 打开持久化模态框（只能有一个）
    openPersistentModal: (state, action: PayloadAction<ModalEnum>) => {
      state.persistentModal = action.payload; // 设置持久化模态框
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("modal", action.payload); // 在 URL 中设置模态框信息
      const pathname = window.location.pathname;
      window.history.pushState(
        {},
        "",
        `${pathname}?${searchParams.toString()}`
      );
    },

    // 关闭持久化模态框
    closePersistentModal: (state) => {
      state.persistentModal = null; // 移除持久化模态框
      // 可选：从 URL 中删除模态框参数
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("modal");
      const pathname = window.location.pathname;
      window.history.pushState(
        {},
        "",
        `${pathname}?${searchParams.toString()}`
      );
    },

    // 从 URL 或 localStorage 初始化持久化模态框
    initializePersistentModal: (state) => {
      const urlModal = new URLSearchParams(window.location.search).get("modal");
      if (urlModal) {
        state.persistentModal = urlModal as ModalEnum; // 从 URL 设置持久化模态框
      }
    },
  },
});

// 导出 actions 以便在组件中 dispatch 使用
export const {
  openModal,
  closeModal,
  openPersistentModal,
  closePersistentModal,
  initializePersistentModal,
} = modalSlice.actions;

export default modalSlice.reducer;
