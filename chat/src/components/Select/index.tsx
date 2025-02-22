"use client";
import React, { ChangeEvent, useState, useRef, useMemo } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
interface SelectProps {
  name?: string;
  value?: string | string[];
  options: { label: string; value: string }[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
  className?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  value: propValue,
  options,
  onChange,
  multiple = false,
  className = "",
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string | string[]>(propValue || []); // 管理内部值
  const selectRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectRef, () => setIsOpen(false));
  // 计算显示值
  const displayValue = useMemo(() => {
    if (Array.isArray(value)) {
      return value
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .join(", ");
    }
    return options.find((opt) => opt.value === value)?.label;
  }, [value, options]);

  // 处理选中值
  const handleChange = (selectedValue: string) => {
    let newValue: string | string[];
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      newValue = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue) // 取消选中
        : [...currentValues, selectedValue]; // 选中
    } else {
      newValue = selectedValue;
      setIsOpen(false); // 单选时关闭下拉菜单
    }
    setValue(newValue); // 更新内部的值
    // 如果有 onChange 回调，将更新的值传递给父组件
    if (onChange) {
      onChange({
        target: {
          name: name || "",
          value: newValue,
        } as unknown as HTMLSelectElement,
      } as ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* 选择框 */}
      <div
        className="p-2 mt-1 rounded-md bg-white border border-gray-300 w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{displayValue || placeholder}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                (Array.isArray(value) && value.includes(option.value)) ||
                (!multiple && value === option.value)
                  ? "bg-blue-50"
                  : ""
              }`}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
