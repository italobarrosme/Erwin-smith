import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import WindiCSS from "vite-plugin-windicss";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Inspect from "vite-plugin-inspect";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@types": path.resolve(__dirname, "./src/@types"),
      "@atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@molecules": path.resolve(__dirname, "./src/components/molecules"),
      "@organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@templates": path.resolve(__dirname, "./src/components/templates"),
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    Pages({
      extensions: ["vue"],
      extendRoute(route) {
        if (route.path !== "/signin") {
          return {
            ...route,
            meta: {
              ...route.meta,
              requiresAuth: true,
            },
          };
        }

        return route;
      },
    }),
    Layouts(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/head", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          componentPrefix: "",
        }),
      ],
      dts: "src/components.d.ts",
    }),
    Icons({
      autoInstall: true,
    }),
    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
    mkcert(),
  ],
  ssgOptions: {
    script: "async",
    formatting: "minify",
  },

  server: {
    https: true,
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg

  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core", "@vueuse/head"],
    exclude: ["vue-demi"],
  },
});
