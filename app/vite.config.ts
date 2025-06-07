import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unimport from "unimport/unplugin";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { QuasarResolver } from "unplugin-vue-components/resolvers";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      autoImportComponentCase: "pascal",
      sassVariables: fileURLToPath(
        new URL("./src/quasar-variables.sass", import.meta.url)
      ),
    }),

    Unimport.vite({
      dts: true,
      presets: ["vue"],
      addons: {
        vueTemplate: true,
      },
    }),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      // targets to transform
      include: [
        /\.ts$/, // .ts,
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],

      // global imports to register
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "quasar",
      ],

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: ["./src/stores", "./src/utils/**"],

      vueTemplate: true,

      dts: "./auto-imports.d.ts",
    }),

    Components({
      directoryAsNamespace: true,
      dts: true,
      globalNamespaces: ["global"],
      include: [/\.vue($|\?)/],
      globs: ["src/components/**/*.vue", "src/features/**/*.vue"],
      resolvers: [QuasarResolver()],
    }),
  ],
});
