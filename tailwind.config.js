// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],

//   // costomized themes
// daisyui:{
//  themes: [
//     {
//       weddingtheme:{
//         primary: '#0FCFEC',
//         secondary: '#19D3AE',
//         accent: '#37CDBE',
//         neutral: '#3D4451',
//         "base-100": '#FFFFFF',
//       }
//     }
//   ]
// },
// //

//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        weddingtheme: {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
