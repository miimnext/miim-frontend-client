// types/modal.ts

export interface ModalData {
  title?: string;
  message?: string;
}

export interface Modal {
  isOpen: boolean;
  data: ModalData;
}
export interface ModalConfig {
  title: string;
  content: string;
  cancel?: boolean;
  cancelText?: string;
  cancelFun?: () => void;
  confirm?: boolean;
  confirmText?: string;
  confirmFun?: () => void;
  close?: boolean;
}

export type Modals = Record<string, Modal>;
