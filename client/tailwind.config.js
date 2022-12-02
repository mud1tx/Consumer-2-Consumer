// module.exports = {
//   future: {
//     // removeDeprecatedGapUtilities: true,
//     // purgeLayersByDefault: true,
//   },
//   purge: [],
//   theme: {
//     extend: {},
//   },
//   variants: {},
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
    primary:"#5ec576",
    secondry:"#ff585f",
    tertiary:"#4bbb7d",
    primary_darker:"#4bbb7d",
    secondry_darker:"#ffbb00",
    tertiary_darker:"#fd424b",
    primary_opacity:"#5ec5763a",
    secondry_opacity:"#ffcd0331",
    tertiary_opacity:"#ff58602d",
    backgound_white:"#f3f3f3",
    text_color:"#444",
    main_white:"#FFFFFF",
    },
    // backgroundImage: {
    //     'hero-pattern': "url')",
    //     'footer-texture': "url('/img/footer-texture.png')",
    //   }
 },
//  animation: {
//   'jump': 'jump 0.5s linear', 
// },
// keyframes: {
//   jump: {
//     '40%': { 
//       'transform': 'translateY(-4px)',
//       'text-shadow': '0 3px 1px rgba(0, 0, 0, .2)'
//     },
//     '100%': {
//       'transform': 'translateY(0px)'
//     }
//   },
// },
  },
  plugins: [],
}