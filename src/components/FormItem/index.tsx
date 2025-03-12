import React, { ReactElement, ChangeEvent } from "react";
import { useFormContext } from "@/components/Form/FormContext";

interface FieldProps {
  name: string;
  value: string | string[];
  error: string | null; // error should be a string or null
  className?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

interface FormItemProps {
  label?: string;
  name: string;
  className?: string;
  customize?: boolean;
  children: ReactElement<FieldProps>;
}

const FormItem = ({
  label,
  name,
  children,
  className,
  customize,
}: FormItemProps) => {
  const { formData, updateFormData, rules } = useFormContext();
  const [error, setError] = React.useState<string | null>(null);

  const validate = (value: string): boolean => {
    const fieldRules = rules[name] || [];
    for (const rule of fieldRules) {
      if (rule.required && !value) {
        setError(rule.message || "This field is required");
        return false;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        setError(rule.message || "Invalid format");
        return false;
      }
      if (rule.minLength && value.length < rule.minLength) {
        setError(rule.message || `Minimum length is ${rule.minLength}`);
        return false;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        setError(rule.message || `Maximum length is ${rule.maxLength}`);
        return false;
      }
    }
    setError(null); // Reset error if validation passes
    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = customize
      ? (e as unknown as string)
      : (e.target.value as string);
    updateFormData(name, value);
    validate(value);
  };

  return (
    <div className={`form-item mb-4${className ? className : ""}`}>
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
        value: (formData[name] as string | string[]) || "",
        onChange: handleChange,
        error: error, // Pass error message directly (string or null)
        className: `  w-full  ${children.props.className}`, // Apply red border if there's an error
      })}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default FormItem;
