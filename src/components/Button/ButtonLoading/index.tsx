import "./ButtonLoading.modules.css"; // 引入 SCSS 模块
export default function ButtonLoading() {
  return (
    <svg viewBox="0 0 120 120" className="pl">
      <circle
        strokeLinecap="round"
        strokeDashoffset="-330"
        strokeDasharray="0 660"
        strokeWidth="6"
        stroke="#3498db"
        fill="none"
        r="30"
        cy="60"
        cx="60"
        className="pl__ring pl__ring--a"
      ></circle>
      <circle
        strokeLinecap="round"
        strokeDashoffset="-110"
        strokeDasharray="0 220"
        strokeWidth="6"
        stroke="#f39c12"
        fill="none"
        r="10"
        cy="60"
        cx="60"
        className="pl__ring pl__ring--b"
      ></circle>
      <circle
        strokeLinecap="round"
        strokeDasharray="0 440"
        strokeWidth="6"
        stroke="#e74c3c"
        fill="none"
        r="20"
        cy="60"
        cx="40"
        className="pl__ring pl__ring--c"
      ></circle>
      <circle
        strokeLinecap="round"
        strokeDasharray="0 440"
        strokeWidth="6"
        stroke="#2ecc71"
        fill="none"
        r="20"
        cy="60"
        cx="80"
        className="pl__ring pl__ring--d"
      ></circle>
    </svg>
  );
}
