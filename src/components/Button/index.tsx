import React from "react";
import ButtonLoading from "./ButtonLoading";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "warn" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean; // 可以通过这个属性手动设置禁用状态
  fullWidth?: boolean; // 新增属性，用于控制是否宽度 100%
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false, // 默认不为 100% 宽度
  className,
  ...props
}: ButtonProps) => {
  // 基础样式
  const baseStyles =
    "rounded-lg font-medium text-text-1  flex items-center justify-center shadow-lg  hover:opacity-80 transition-all active:scale-95";
  // 按钮类型样式
  let variantStyles = "";
  if (variant === "primary") {
    variantStyles = "bg-button-bg-1 hover:bg-primary-1";
  } else if (variant === "warn") {
    variantStyles = "bg-warn-1 hover:bg-warn-1";
  } else if (variant === "danger") {
    variantStyles = "bg-danger-1 hover:bg-danger-1";
  }

  // 按钮大小样式
  let sizeStyles = "";
  if (size === "sm") {
    sizeStyles = "px-3 py-1 text-sm";
  } else if (size === "md") {
    sizeStyles = "px-4 py-2 text-base";
  } else if (size === "lg") {
    sizeStyles = "px-5 py-3 text-lg";
  }

  // 判断是否为加载中
  const loadingStyles = loading ? "cursor-not-allowed active:scale-100" : "";
  // 判断禁用样式
  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed  active:scale-100"
    : "";

  // 按钮的最终类名
  const buttonClasses = `${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${loadingStyles} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading ? <ButtonLoading /> : children}
    </button>
  );
};

export default Button;
export type { ButtonProps };
