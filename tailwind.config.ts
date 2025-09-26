import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "100": "#E6F0FF",
          DEFAULT: "#2563EB",
          "900": "#1E3A8A",
        },
        secondary: {
          "100": "#CCFBF1",
          DEFAULT: "#14B8A6",
          "900": "#0F766E",
        },
        gray: {
          "100": "#F9FAFB",
          "200": "#E5E7EB",
          "300": "#9CA3AF",
          "700": "#374151",
          DEFAULT: "#111827",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        100: "0 2px 4px rgba(0, 0, 0, 0.05)",
        200: "0 4px 8px rgba(0, 0, 0, 0.08)",
        300: "0 6px 12px rgba(37, 99, 235, 0.25)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'), // <-- added line-clamp plugin
  ],
};

export default config;
