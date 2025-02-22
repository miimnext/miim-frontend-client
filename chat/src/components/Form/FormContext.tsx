"use client";
import { createContext, useContext } from "react";

// Define a rule interface for form validation
interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

// FormContextType will be generic and accept a type T
interface FormContextType<T> {
  formData: T;
  updateFormData: (name: keyof T, value: string) => void;
  rules: { [key in keyof T]?: Rule[] };
}

// Create a context with a default value of undefined, and its type inferred by FormContextType<T>
const FormContext = createContext<
  FormContextType<Record<string, unknown>> | undefined
>(undefined);

// Custom hook to use the FormContext with a generic type T
export const useFormContext = <
  T extends Record<string, unknown>,
>(): FormContextType<T> => {
  const context = useContext(
    FormContext as React.Context<FormContextType<T> | undefined>
  );
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export default FormContext;
