// Select.tsx
import React from "react";

export interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
  name: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  onBlur,
  name,
  options,
}) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className="form-select"
  >
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);
