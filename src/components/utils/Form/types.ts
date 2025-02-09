export enum FieldType {
  Text = "text",
  Password = "password",
  Textarea = "textarea",
  Email = "email",
}

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validate?: RegExp; // 直接使用 RegExp 类型
}

export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}
