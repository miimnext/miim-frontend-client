// src/components/Input.tsx
import React from 'react';
import { useFormContext } from '../Form';

interface InputProps {
  name?: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ name, type, value, onChange }) => {
  // 如果在 Form 组件内，则使用 form context 来处理状态
  const { values, setValue } = useFormContext();

  // 如果没有传入 value 和 onChange，则表示在 Form 组件内使用
  if (name) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, e.target.value); // 使用 Form 状态管理
    };

    return (
      <input
        type={type}
        value={values[name] || ''}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
      />
    );
  }

  // 否则，作为普通输入框使用，允许外部传入 value 和 onChange
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border rounded-md"
    />
  );
};
