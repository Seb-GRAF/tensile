import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: [{ find: /^tensile$/, replacement: fileURLToPath(new URL("src/index.ts", import.meta.url)) }] },
});
