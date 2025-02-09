// src/components/Form.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useForm, FormValues } from '@/hooks/useForm';

const FormContext = createContext<any>(null);

interface FormProps<T extends FormValues> {
    children: ReactNode;
    defaultValues?: T;
    onSubmit?: (values: T) => void;
}

/**
 * Form 组件，提供表单上下文并处理提交
 */
const Form = <T extends FormValues>({ children, defaultValues, onSubmit }: FormProps<T>) => {
    const form = useForm(defaultValues || ({} as T));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(form.getValues());
    };

    return (
        <FormContext.Provider value={form}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {children}
            </form>
        </FormContext.Provider>
    );
}

/**
 * 使用表单上下文获取表单状态
 */
function useFormContext<T extends FormValues>() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext 必须在 Form 组件内部使用');
    }
    return context as { values: T; setValue: (name: keyof T, value: any) => void };
}

// 默认导出 Form 组件，命名导出 useFormContext
export default Form;
export { useFormContext };
