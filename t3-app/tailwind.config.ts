import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#0075B8",
        whiteApp: "#FFFFFF",
        grayApp: "#D9D9D9",
        cardClientBG: "#00649E",
        orangeApp: "#F34213",
        blackApp: "#011627",
        greenApp: "#44AF69",
      },
      dropShadow: {
        navBarShadow: "0px -5px 4px rgba(0, 0, 0, 0.20)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
