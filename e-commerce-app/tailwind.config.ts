import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#FF6B35", // Vibrant orange for primary actions (e.g., buttons, links)
          light: "#FF8C61", // Lighter shade for hover states or secondary elements
          dark: "#E54E1B", // Darker shade for focused or active states
        },
        secondary: {
          main: "#4ECDC4", // Cool teal for secondary actions or highlights
          light: "#7AD9D2", // Lighter teal for hover states or backgrounds
          dark: "#36B1A8", // Darker teal for focused or active states
        },
        accent: {
          yellow: "#FFD166", // Warm yellow for accentuating elements (e.g., badges, highlights)
          purple: "#9381FF", // Soft purple for additional accents (e.g., tags, borders)
        },
        neutral: {
          white: "#FFFFFF", // Standard white for backgrounds and text
          lightGray: "#F5F5F5", // Light gray for subtle backgrounds and borders
          mediumGray: "#A0A0A0", // Adjusted medium gray for more readable text or icons
          darkGray: "#333333", // Dark gray for primary text
          black: "#000000", // Black for the darkest elements or contrast
        },
        semantic: {
          success: "#4CAF50", // Green for success messages or indicators
          warning: "#FFC107", // Yellow for warnings or cautions
          error: "#F44336", // Red for error messages or alerts
          info: "#2196F3", // Blue for informational messages or tips
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: ["light", "light"],
  },
} satisfies Config;

export default config;
