import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";
import { colors, typography } from "./src/assets/themes/default/index";

export default defineConfig({
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,
  theme: {
    extend: {
      colors,
      ...typography,
      screens: {
        csm: "320px",
        cmd: "480px",
        csmtb: "768px",
        cnotsm: "1024px",
        cnotmd: "1281px",
        cnot: "1440px",
        chd: "1920px",
      },
    },
  },

  plugins: [
    require("windicss/plugin/typography")(),
    plugin(({ addComponents }) => {
      addComponents({
        ".min-page": {
          minHeight: "calc(100vh - 72px)",
        },
      });
    }),
  ],
});
