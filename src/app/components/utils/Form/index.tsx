import React, { useState } from "react";
import FormField from "./FormField";
import { FormData, FormErrors, Field } from "./types";
import { validateField, validateForm } from "./validate";
import Button from "../../Button";

interface FormProps {
  fields: Field[];
  onSubmit: (data: FormData) => Promise<void>; // 确保 onSubmit 返回 Promise
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 对当前字段进行验证
    const newErrors = validateField(name, value, fields, errors);
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // 提交时设置 loading 状态为 true

    // 校验所有字段
    const validationErrors = validateForm(formData, fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false); // 校验失败时，关闭 loading 状态
    } else {
      try {
        // 调用传入的异步 onSubmit 函数
        await onSubmit(formData);
        console.log(12312123123);

        // 请求完成后关闭 loading 状态
        setIsSubmitting(false);
        setErrors({});
      } catch (error) {
        console.error("提交失败:", error);
        setIsSubmitting(false); // 如果请求失败，关闭 loading 状态
      }
    }
  };

  const isFormValid = Object.keys(formData).every(
    (key) => !!formData[key] && !errors[key]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          loading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
