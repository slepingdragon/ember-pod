/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Keep in sync with the landing page (ember-pod/tailwind.config.ts).
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Ink scale — mirrors the landing page.
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#0d0d0d",
          800: "#111111",
          700: "#171717",
          600: "#1f1f1f",
        },
        // Ember stays reachable for app icon / brand accents but is not used
        // in the UI chrome — the landing page is pure grayscale.
        ember: {
          DEFAULT: "#FF6B35",
          deep: "#F25C05",
          soft: "#FFE5D4",
        },
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
};
