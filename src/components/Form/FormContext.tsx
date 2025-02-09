"use client";
import { createContext, useContext } from "react";

interface FormContextType {
  formData: { [key: string]: string };
  updateFormData: (name: string, value: string) => void;
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
