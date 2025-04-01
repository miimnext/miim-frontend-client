import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-1": "var(--background-1)",
        "button-bg-1": "var(--button-bg-1)",
        "text-1": "var(--text-1)",
        "primary-1": "var(--primary-1)",
        "warn-1": "var(--warn-1)",
        "danger-1": "var(--danger-1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
