/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        lineClamp: {
            7: "7",
            8: "8",
            10: "10"
        }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
}
