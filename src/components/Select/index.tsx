"use client";
import React, { ChangeEvent, useState, useRef, useMemo } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

interface Options {
  value: string | number;
  label: string;
}

interface SelectProps {
  name?: string;
  value?: string | string[] | number | number[];
  options: Options[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
  className?: string;
  placeholder?: string;
}

const Select = ({
  name,
  value: propValue,
  options,
  onChange,
  multiple = false,
  className = "",
  placeholder = "Select an option",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string | number | (string | number)[]>(
    propValue || (multiple ? [] : "")
  );
  const selectRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectRef, () => setIsOpen(false));

  const displayValue = useMemo(() => {
    if (Array.isArray(value)) {
      return value
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .join(", ");
    }
    return options.find((opt) => opt.value === value)?.label || placeholder;
  }, [value, options, placeholder]);

  const handleChange = (selectedValue: string | number) => {
    let newValue: string | number | (string | number)[];
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      newValue = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue) // Deselect
        : [...currentValues, selectedValue]; // Select
    } else {
      newValue = selectedValue;
      setIsOpen(false); // Close dropdown for single selection
    }
    setValue(newValue);

    // Trigger onChange event
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
      {/* Dropdown trigger */}
      <div
        className="p-2 mt-1 rounded-md  bg-[--background-1] border border-[--button-bg-1]w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {displayValue ? displayValue : placeholder}
        </span>
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

      {/* Dropdown menu */}
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
