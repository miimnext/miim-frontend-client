"use client";

import { useDispatch } from "react-redux";
import { setTheme } from "@/store/themeSlice";
import { Theme } from "@/enum/common";
export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const toggleTheme = (value: Theme) => {
    if (document.documentElement.classList.contains(value)) return;
    dispatch(setTheme(value));
  };
  return (
    <div className="flex gap-4 p-4">
      <button
        onClick={() => toggleTheme(Theme.Light)}
        className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300"
      >
        🌞 Light Mode
      </button>

      <button
        onClick={() => toggleTheme(Theme.Dark)}
        className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300"
      >
        🌜 Dark Mode
      </button>

      <button
        onClick={() => toggleTheme(Theme.System)}
        className="px-4 py-2   font-semibold rounded-lg shadow-md  transition-all duration-300"
      >
        🔄 System Mode
      </button>
    </div>
  );
}
