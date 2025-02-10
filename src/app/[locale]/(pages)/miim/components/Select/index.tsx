"use client";
import Selectc from "@/components/Select";
const options = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "other", label: "其他" },
];
export default function Select() {
  return (
    <>
      <Selectc options={options}></Selectc>
      <Selectc options={options} multiple></Selectc>
    </>
  );
}
