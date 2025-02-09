import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // 是否为错误状态
}

const Input: React.FC<InputProps> = ({ className, error, ...props }) => {
  return (
    <input
      {...props}
      className={`
        w-full p-2 rounded-md outline-none border 
        ${error ? "border-red-500" : "border-gray-300"}
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
};

export default Input;
