import React, { useState } from "react";

// 表单字段的类型定义
interface Field {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "textarea";
    placeholder?: string;
    required?: boolean;
    validate?: (value: string) => string | null; // 可选的自定义验证函数
}

// 表单数据的类型
interface FormData {
    [key: string]: string;
}

// 错误信息的类型
interface FormErrors {
    [key: string]: string;
}

// 表单组件的 props 类型
interface FormProps {
    fields: Field[];
    onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
    const [formData, setFormData] = useState<FormData>(
        fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as FormData)
    );
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 更新表单字段的值
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 校验表单字段
    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        fields.forEach((field) => {
            const value = formData[field.name];
            // 如果字段是必填的，检查它是否为空
            if (field.required && !value) {
                newErrors[field.name] = `${field.label} is required`;
            }
            // 如果有自定义验证函数，执行它
            if (field.validate) {
                const error = field.validate(value);
                if (error) {
                    newErrors[field.name] = error;
                }
            }
        });

        return newErrors;
    };

    // 提交表单
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
        } else {
            onSubmit(formData); // 执行传入的 onSubmit 函数
            setIsSubmitting(false);
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-semibold">
                        {field.label}
                    </label>
                    {field.type === "textarea" ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    ) : (
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    )}
                    {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                    )}
                </div>
            ))}
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default Form;
