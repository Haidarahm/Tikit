import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { asyncCSS } from "./vite-plugin-async-css.js";

export default defineConfig({
  base: "/",

  plugins: [react(), tailwindcss(), asyncCSS()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "es2018",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    emptyOutDir: true,
  }
  ,

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },
});