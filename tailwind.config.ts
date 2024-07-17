import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "steam-header": "#171d25",
      },
      animation: {
        byBottom: "byBottom 1s ease both",
        linkAfter: "linkAfter .5s 1s ease both",
      },
      keyframes: {
        byBottom: {
          "0%": { transform: "translateY(150%)" },
          "100%": { transform: "translateY(0)" },
        },
        linkAfter: {
          "0%": { width: "0" },
          "100%": { width: "30px" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
