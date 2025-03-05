import { createRoot } from "react-dom/client";
import Toast from "../components/Toast";

type ToastType = "success" | "error" | "info" | "warning";

const useToast = () => {
  const showToast = (message: string, type: ToastType, duration = 1500) => {
    // 创建 toast 容器
    const container = document.createElement("div");
    document.body.appendChild(container);

    // 创建 root
    const root = createRoot(container);

    // 渲染 Toast 组件
    root.render(
      <Toast
        message={message}
        type={type}
        duration={duration}
        onClose={() => {
          // 卸载组件并移除容器
          root.unmount();
          document.body.removeChild(container);
        }}
      />
    );
  };

  return { showToast };
};

export default useToast;
