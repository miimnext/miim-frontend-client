import React from "react";

export interface TextAreaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  className?: string;
  error?: string | null;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value = "",
  onChange = () => { }, // Default empty function
  onBlur = () => { }, // Default empty function
  name,
  placeholder,
  className = "", // Allow additional custom class names
  error,
}) => (
  <div className="relative">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`form-textarea p-2 mt-1 rounded-md w-full border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 ${className}`}
      aria-invalid={!!error} // For better accessibility
      aria-describedby={error ? `${name}-error` : undefined} // Reference error message
    />
    {error && (
      <div id={`${name}-error`} className="text-red-500 text-xs mt-1">
        {error}
      </div>
    )}
  </div>
);
