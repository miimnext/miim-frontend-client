// Radio.tsx
import React from "react";

export interface RadioProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  name: string;
  value: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  onBlur,
  name,
  value,
}) => (
  <input
    type="radio"
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    onBlur={onBlur}
    className="form-radio"
  />
);
