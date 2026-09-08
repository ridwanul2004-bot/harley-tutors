import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#081A2D",
        navy: "#112E4D",
        gold: "#E89B20",
        cream: "#F7F4EC"
      },
      boxShadow: {
        premium: "0 24px 70px rgba(8, 26, 45, 0.14)"
      }
    }
  },
  plugins: []
} satisfies Config;
