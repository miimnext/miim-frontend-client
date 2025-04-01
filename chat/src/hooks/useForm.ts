"use client";
// hooks/useForm.ts
import { useState } from "react";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps {
  initialValues: FormValues;
  validate?: (values: FormValues) => FormErrors | Promise<FormErrors>;
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export const useForm = ({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate ? await validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(values);
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
