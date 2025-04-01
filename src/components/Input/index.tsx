import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // 是否为错误状态
}

const Input = ({ className, error, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`
        p-2 rounded-md outline-none border  bg-[--background-1] 
       border-2
        ${error ? "border-red-500" : "border-[--button-bg-1]"}
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
};

export default Input;
