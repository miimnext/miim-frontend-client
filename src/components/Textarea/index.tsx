import React from "react";

interface TextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  ariaInvalid?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ariaInvalid = false,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-md ${className}`}
      aria-invalid={ariaInvalid}
    />
  );
};

export default Textarea;
