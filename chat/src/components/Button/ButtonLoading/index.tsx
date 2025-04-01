import "./ButtonLoading.modules.css"; // 引入 SCSS 模块
export default function ButtonLoading() {
  return (
    <div className="flex border-current gap-2 items-center opacity-30">
      <div className="loader "></div>Loading...
    </div>
  );
}
