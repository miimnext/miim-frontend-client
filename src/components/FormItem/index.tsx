import React, { ReactElement } from "react";
import { useFormContext } from "@/components/Form/FormContext";

// Define the FieldProps interface to make it reusable
interface FieldProps {
  name: string;
  value: string;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface FormItemProps {
  label?: string;
  name: string;
  children: ReactElement<FieldProps>; // Use the FieldProps interface here
  rules?: Array<{ required?: boolean; message?: string; pattern?: RegExp }>;
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  children,
  rules = [],
}) => {
  const { formData, updateFormData } = useFormContext();
  const [error, setError] = React.useState<string>("");

  const validate = (value: string): boolean => {
    for (const rule of rules) {
      if (rule.required && !value) {
        setError(rule.message || "This field is required");
        return false;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        setError(rule.message || "Invalid format");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    updateFormData(name, value);
    validate(value);
  };

  return (
    <div className="form-item mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      {React.cloneElement(children, {
        name,
        value: formData[name] || "",
        onChange: handleChange,
        className: "p-2 mt-1 rounded-md w-full ",
      })}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default FormItem;
