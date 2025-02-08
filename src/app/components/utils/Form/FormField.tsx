import React from "react";
import { Field } from "./types"; // Assuming Field type is already defined
import Input from "../../Input";
interface FormFieldProps {
  field: Field;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string; // Optional error prop
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  // Return the appropriate form element (textarea or input)
  const renderInput = () => {
    if (field.type === "textarea") {
      return (
        <textarea
          id={field.name}
          name={field.name}
          value={value}
          aria-invalid={!!error} // Set aria-invalid based on error presence
        />
      );
    }

    return (
      <Input
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        aria-invalid={!!error}
      />
    );
  };

  // Ensure the component properly returns JSX
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm font-semibold"
        aria-label={field.label}
      >
        {field.label}
      </label>
      {renderInput()} {/* Call the method to render the input or textarea */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
