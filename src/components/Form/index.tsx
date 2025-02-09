"use client";
import React, { useState } from "react";
import FormContext from "./FormContext";

interface FormProps {
  onSubmit: (formData: { [key: string]: string }) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const updateFormData = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData); // Pass form data to onSubmit
        }}
        className="space-y-4"
      >
        {children}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </FormContext.Provider>
  );
};

export default Form;
