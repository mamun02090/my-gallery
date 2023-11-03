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
        tablet: "640px",
        iPad: "768px",
        laptop: "1024px",
        desktop: "1280px",
        large: "1360px",
        larger: "1660px",
        largest: "2440px",
      },

      backgroundColor: {
        overLayerColor: "rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
