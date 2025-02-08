import React from "react";

interface InputProps {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  ariaInvalid?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  className = "",
  ariaInvalid = false,
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-md ${className}`}
      aria-invalid={ariaInvalid}
    />
  );
};

export default Input;
