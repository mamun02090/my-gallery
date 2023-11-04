/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "430px",
        media500: "500px",
        media380: "380px",
        media330: "330px",
        media300: "300px",
      },

      backgroundColor: {
        overLayerColor: "rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
