/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("tailwind-clip-path")],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ec576",
        secondry: "#ff585f",
        tertiary: "#4bbb7d",
        primary_darker: "#4bbb7d",
        secondry_darker: "#ffbb00",
        tertiary_darker: "#fd424b",
        primary_opacity: "#5ec5763a",
        secondry_opacity: "#ffcd0331",
        tertiary_opacity: "#ff58602d",
        backgound_white: "#f3f3f3",
        text_color: "#444",
        main_white: "#FFFFFF",
        facebook: "#3b5998",
        instagram: "#bc2a8d",
        linkedin: "#0077b5",
        github: "#333",
        svg_color:"#3F3D56",
      },
      fontFamily: {
        Poppins: ["Poppins"],
      },
    },
  }, 
  plugins: [],
};
