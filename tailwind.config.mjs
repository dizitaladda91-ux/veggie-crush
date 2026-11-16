/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1B5E14",
          red: "#B00D0D",
          orange: "#F7941D",
          leaf: "#2E8B1F",
          cream: "#FFFBF2",
          ink: "#1A1A1A",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Cabin", "sans-serif"],
        badge: ["var(--font-badge)", "Alfa Slab One", "cursive"],
        tagline: ["var(--font-tagline)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
