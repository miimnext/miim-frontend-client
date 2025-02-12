import Loading from "@/components/Loading";

import ThemeSwitcher from "../../(layout)/ThemeSwitcher";
export default function Home() {
  return (
    <div className=" mx-auto ">
      <Loading></Loading>
      <ThemeSwitcher />
    </div>
  );
}
