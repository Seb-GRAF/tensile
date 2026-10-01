import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) =>
  mode === "css"
    ? {
        plugins: [tailwindcss()],
        base: "./",
        build: {
          outDir: "dist",
          assetsDir: "",
          rolldownOptions: {
            input: { styles: "src/index.css", reset: "src/reset.css" },
            output: { assetFileNames: "[name][extname]" },
          },
        },
      }
    : {
        plugins: [react()],
        build: {
          outDir: "dist",
          emptyOutDir: false,
          lib: { entry: "src/index.ts", formats: ["es"], fileName: "index" },
          rolldownOptions: {
            external: (id) => /^(react|react-dom|motion)(\/|$)/.test(id),
            output: { banner: '"use client";' },
          },
        },
      },
);
