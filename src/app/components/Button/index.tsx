import React from "react";
import ButtonLoading from "./ButtonLoading";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean; // 可以通过这个属性手动设置禁用状态
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  className,
  ...props
}) => {
  // 基础样式
  const baseStyles =
    "rounded-lg font-medium transition duration-300 flex items-center justify-center";

  // 按钮类型样式
  let variantStyles = "";
  if (variant === "primary") {
    variantStyles = "bg-blue-500 text-white hover:bg-blue-600";
  } else if (variant === "secondary") {
    variantStyles = "bg-gray-500 text-white hover:bg-gray-600";
  } else if (variant === "danger") {
    variantStyles = "bg-red-500 text-white hover:bg-red-600";
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
  const loadingStyles = isLoading ? "opacity-50 cursor-not-allowed" : "";

  // 判断禁用样式
  const disabledStyles =
    isDisabled || isLoading ? "opacity-30 cursor-not-allowed" : "";

  // 按钮的最终类名
  const buttonClasses = `${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${loadingStyles} ${className}`;

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading ? <ButtonLoading /> : children}
    </button>
  );
};

export default Button;
