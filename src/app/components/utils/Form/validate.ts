import { FormData, FormErrors, Field } from "./types";

export const validateField = (
  name: string,
  value: string,
  fields: Field[],
  errors: FormErrors
): FormErrors => {
  const field = fields.find((field) => field.name === name);
  const newErrors = { ...errors };

  if (field) {
    // 如果字段是必填的，检查它是否为空
    if (field.required && !value) {
      newErrors[name] = `${field.label} is required`;
    } else if (field.validate && value) {
      const regex = field.validate; // 直接获取传入的正则表达式
      if (!regex.test(value)) {
        newErrors[name] = `${field.label} is invalid`;
      } else {
        // 如果校验通过，清除错误信息
        delete newErrors[name];
      }
    }
  }

  return newErrors;
};

// 校验所有字段
export const validateForm = (
  formData: FormData,
  fields: Field[]
): FormErrors => {
  const newErrors: FormErrors = {};

  fields.forEach((field) => {
    const value = formData[field.name];
    if (field.required && !value) {
      newErrors[field.name] = `${field.label} is required`;
    } else if (field.validate && value) {
      const regex = field.validate; // 直接获取传入的正则表达式
      if (!regex.test(value)) {
        newErrors[field.name] = `${field.label} is invalid`;
      }
    }
  });

  return newErrors;
};
