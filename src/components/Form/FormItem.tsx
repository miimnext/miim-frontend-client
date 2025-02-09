import React from "react";
import { useFormContext } from "./index";

interface FormItemProps {
  name: string;
  label?: string;
  children: (value: any, setValue: (value: any) => void) => React.ReactNode;
}

export function FormItem({ name, label, children }: FormItemProps) {
  const { values, setValue } = useFormContext();

  return (
    <div className="flex flex-col" >
      {label && <label className="mb-1 text-sm font-medium" > {label} </label>
      }
      {children(values[name], (value) => setValue(name, value))}
    </div>
  );
}
