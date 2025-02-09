// components/Input.tsx
import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className, // Allow for external className prop
  ...props
}) => (
  <input
    {...props}
    className={`p-2 rounded-md outline-none ${className}`} // Default styles + custom styles
  />
);

export default Input;
