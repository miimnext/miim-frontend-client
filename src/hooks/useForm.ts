// src/hooks/useForm.ts
import { useState } from 'react';

export interface FormValues {
    [key: string]: string;  // 表单的字段和值
}

interface FormContextType<T extends FormValues> {
    values: T;  // 存储表单的所有值
    setValue: (name: keyof T, value: string) => void;  // 设置某个字段的值
    getValues: () => T;  // 获取所有表单值
    reset: () => void;  // 重置表单
}

/**
 * 自定义 Hook 用来管理表单的值和状态
 */
export function useForm<T extends FormValues>(defaultValues: T = {} as T): FormContextType<T> {
    const [values, setValues] = useState<T>(defaultValues);

    const setValue = (name: keyof T, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const getValues = () => values;

    const reset = () => setValues(defaultValues);

    return { values, setValue, getValues, reset };
}

