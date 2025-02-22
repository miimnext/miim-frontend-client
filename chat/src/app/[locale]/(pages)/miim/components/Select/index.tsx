"use client";
import Select from "@/components/Select";
const options = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "other", label: "其他" },
  { value: "male1", label: "男" },
  { value: "female1", label: "女" },
  { value: "other1", label: "其他" },
  { value: "male2", label: "男" },
  { value: "female2", label: "女" },
  { value: "other2", label: "其他" },
];
export default function App() {
  return (
    <>
      单选
      <Select options={options} className="w-[200px]"></Select>
      多选
      <Select options={options} multiple></Select>
    </>
  );
}
