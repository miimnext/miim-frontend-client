import componentsMaps from "@/app/[locale]/(pages)/miim/components";
import ThemeSwitcher from "@/app/[locale]/(layout)/ThemeSwitcher";
import { Link } from "@/i18n/routing";
export default function Home() {
  return (
    <div className="max-w-3xl mx-auto ">
      <ThemeSwitcher />
      <ul className="list-none p-4 space-y-2 bg-gray-100 rounded-lg shadow-md mt-10 mb-10">
        {Object.keys(componentsMaps).map((key) => (
          <Link key={key} href={`/miim/${key}`}>
            <li className=" mb-2 px-4 py-2 bg-white rounded-lg shadow-sm border-l-4 border-blue-500 hover:bg-blue-50 transition cursor-pointer">
              {key}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
