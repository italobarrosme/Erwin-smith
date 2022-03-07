import { defineConfig } from "windicss/helpers";
import typography from "windicss/plugin/typography";
import plugin from "windicss/plugin";
import { colors, typos } from "./src/assets/themes/default/index";

export default defineConfig({
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,

  plugins: [
    typography(),
    plugin(({ addComponents }) => {
      addComponents({
        ".min-page": {
          minHeight: "calc(100vh - 72px)",
        },
      });
    }),
  ],
  theme: {
    extend: {
      colors,
      ...typos,
      screens: {
        csm: "320px",
        cmd: "480px",
        csmtb: "768px",
        cnotsm: "1024px",
        cnotmd: "1281px",
        cnot: "1440px",
        chd: "1920px",
      },
      fontSize: {
        "3xl": "2.0em",
        "2xs": ".70rem",
        "3xs": ".65rem",
        "4xs": ".60rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
  },
});
