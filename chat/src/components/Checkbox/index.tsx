// Checkbox.tsx
import React from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  name: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  onBlur,
  name,
}) => (
  <input
    type="checkbox"
    name={name}
    checked={checked}
    onChange={onChange}
    onBlur={onBlur}
    className="form-checkbox"
  />
);
