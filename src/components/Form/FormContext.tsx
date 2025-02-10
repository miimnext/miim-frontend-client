"use client";
import { createContext, useContext } from "react";

interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

interface FormContextType {
  formData: { [key: string]: string | string[] };
  updateFormData: (name: string, value: string) => void;
  rules: { [key: string]: Rule[] }; // ✅ 新增 rules
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export default FormContext;
