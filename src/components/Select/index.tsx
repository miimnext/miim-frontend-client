import React, { ChangeEvent, useState, useEffect, useRef } from "react";

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
  value,
  options,
  onChange = () => { },
  multiple = false,
  className = "",
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false); // Control dropdown visibility
  const selectRef = useRef<HTMLDivElement>(null);

  // Handle changes in the select element
  const handleChange = (selectedValue: string) => {
    let newValue: string | string[];
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      newValue = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue) // Deselect if already selected
        : [...currentValues, selectedValue]; // Add to selection
    } else {
      newValue = selectedValue;
      setIsOpen(false); // Close dropdown for single select
    }

    onChange({
      target: {
        name,
        value: newValue,
      },
    } as ChangeEvent<HTMLSelectElement>);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Determine the displayed value(s)
  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .join(", ");
    }
    return options.find((opt) => opt.value === value)?.label || placeholder;
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Custom select input */}
      <div
        className="p-2 mt-1 rounded-md bg-white transition border border-gray-300  focus:ring-blue-500 w-full cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{getDisplayValue()}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <div
          className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${(multiple && Array.isArray(value) && value.includes(option.value)) ||
                (!multiple && value === option.value)
                ? "bg-blue-50"
                : ""
                }`}
              onClick={() => handleChange(option.value)}
              role="option"
              aria-selected={
                (multiple && Array.isArray(value) && value.includes(option.value)) ||
                (!multiple && value === option.value)
              }
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