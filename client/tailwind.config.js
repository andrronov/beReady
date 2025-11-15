/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "614px",
        s: "769px",
        sm: "1002px",
        md: "1022px",
        lg: "1092px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
