"use client";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import FormContext from "./FormContext";

interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  minLength?: number;
}

interface FormProps {
  onSubmit: (form: { [key: string]: string | string[] }) => void;
  form: { [key: string]: string | string[] };
  children: React.ReactNode;
  errors?: boolean;
  onValidityChange?: (isValid: boolean) => void;
  rules?: { [key: string]: Rule[] };
}

// Declare FormRef type
export interface FormRef {
  validate: () => boolean;
  isValid: boolean;
}

const Form = forwardRef<FormRef, FormProps>(
  ({ onSubmit, children, form, onValidityChange, rules = {} }, ref) => {
    const [formData, setFormData] = useState<{
      [key: string]: string | string[];
    }>(form);
    const [, setErrors] = useState<{ [key: string]: string | null }>({});
    const [isValid, setIsValid] = useState<boolean>(true); // 当前表单是否有效

    // 更新表单数据并校验字段
    const updateFormData = (name: string, value: string) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // 校验字段数据
    const validateFormData = (name: string, value: string): string | null => {
      const fieldRules = rules[name] || [];
      let errorMessage = null;

      for (const rule of fieldRules) {
        if (rule.required && !value) {
          errorMessage = rule.message || "This field is required";
        }
        if (rule.minLength && value.length < rule.minLength) {
          errorMessage = `Minimum length is ${rule.minLength}`;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorMessage = rule.message || "Invalid format";
        }
      }

      // 设置错误信息
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return errorMessage;
    };

    // 校验整个表单
    const validateForm = () => {
      let hasError = false;
      Object.keys(rules).forEach((name) => {
        const error = validateFormData(name, (formData[name] as string) || "");
        if (error) hasError = true;
      });

      setIsValid(!hasError); // 设置表单有效性状态
      onValidityChange?.(!hasError); // 通知外部表单的有效性
      return !hasError;
    };

    // 提交表单
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        onSubmit(formData); // 仅在表单通过验证时提交
      }
    };

    // 使用 useImperativeHandle 暴露方法给外部
    useImperativeHandle(ref, () => ({
      validate: validateForm,
      isValid,
    }));

    // 每次 formData 或 rules 更新时校验整个表单
    useEffect(() => {
      // Reset errors whenever rules or formData changes
      setErrors({});
      validateForm();
    }, [formData, rules]);

    return (
      <FormContext.Provider value={{ formData, updateFormData, rules }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);
Form.displayName = "Form";
export default Form;
