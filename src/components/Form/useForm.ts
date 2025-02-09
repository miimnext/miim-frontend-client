import { useState, } from "react";

export interface FormValues {
    [key: string]: string; // 表单的值是一个对象，键是字段名，值是字段的值
}

/**
 * 表单上下文类型
 */
interface FormContextType<T extends FormValues> {
    values: T; // 表单的所有数据
    setValue: (name: keyof T, value: string) => void; // 设置表单的某个字段值
    getValues: () => T; // 获取表单所有值
    reset: () => void; // 重置表单
}

/**
 * 自定义 Hook 负责管理表单状态
 * @param defaultValues - 默认表单值
 * @returns 表单操作方法和状态
 */
export function useForm<T extends FormValues>(defaultValues: T = {} as T): FormContextType<T> {
    const [values, setValues] = useState<T>(defaultValues);

    /**
     * 设置表单的某个字段值
     * @param name - 字段名
     * @param value - 新的字段值
     */
    const setValue = (name: keyof T, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * 获取当前表单的所有值
     */
    const getValues = () => values;

    /**
     * 重置表单到默认值
     */
    const reset = () => setValues(defaultValues);

    return { values, setValue, getValues, reset };
}
