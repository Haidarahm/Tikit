import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",

    // Shared-hosting safe
    target: "es2018",
    sourcemap: false,

    // 🔥 ABSOLUTE FIX — force single JS file (no code splitting)
    rollupOptions: {
      output: {
        // Inline ALL dynamic imports into the entry file
        inlineDynamicImports: true,
        // Force all chunks into a single file
        manualChunks: undefined,
        // Single entry file name
        entryFileNames: "assets/index-[hash].js",
        // All chunks go to the same file (shouldn't be needed with inlineDynamicImports, but safety)
        chunkFileNames: "assets/index-[hash].js",
        // Static assets keep their names
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },

    minify: "esbuild",
    emptyOutDir: true,
    chunkSizeWarningLimit: 5000, // Increased since we're bundling everything
  },

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },
});