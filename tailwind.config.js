/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        keyframes: {
            newNote: {
                "0%": {
                    opacity: "0%",
                    scale: ".8",
                },
                "100%": {
                    opacity: "100%",
                    scale: "1"
                }
            },
            editNote: {
                "0%": {
                    visibility: "hidden",
                    scale: "0",
                },
                "100%": {
                    scale: "1",
                    visibility: "visible"
                }
            },
            editNoteEnd: {
                "100%": {
                    scale: "0",
                    visibility: "hidden"
                }
            },
            showModal: {
                "100%": {
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(0,0,0,.2)"
                }
            },
        },
        animation: {
            newNote: "newNote .5s ease forwards ",
            editNote: "editNote .3s ease forwards",
            editNoteEnd: "editNoteEnd .3s ease forwards",
            showModal: "showModal .3s linear forwards",
        }
    }
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-scoped-groups")({
        groups: ["edit"]
    }),
  ],
}
