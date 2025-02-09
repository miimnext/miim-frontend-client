import React, { useState } from "react";

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    options: Option[];
    label?: string;
    onChange?: (value: string | number) => void;
}

const Select: React.FC<SelectProps> = ({ options, label, onChange }) => {
    const [selected, setSelected] = useState<string | number | undefined>();

    const handleChange = (value: string | number) => {
        setSelected(value);
        onChange?.(value);
    };

    return (
        <div className="flex flex-col">
            {label && <label className="mb-1 text-sm font-medium">{label}</label>}
            <select
                className="border p-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={selected}
                onChange={(e) => handleChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
