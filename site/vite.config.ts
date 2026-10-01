import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/tensile/",
  plugins: [react(), tailwindcss()],
  resolve: command === "serve" ? { alias: [{ find: /^tensile$/, replacement: fileURLToPath(new URL("../src/index.ts", import.meta.url)) }] } : {},
  build: { outDir: "../site-dist", emptyOutDir: true },
}));
