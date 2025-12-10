import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-gsap": ["gsap", "@gsap/react"],
          "vendor-animations": ["aos", "lenis"],
          "vendor-ogl": ["ogl"],
          "vendor-ui": [
            "@radix-ui/react-avatar",
            "@radix-ui/react-slot",
            "lucide-react",
          ],
          "vendor-utils": ["zustand", "axios", "i18next", "react-i18next"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Use esbuild instead of terser for better compatibility with Vite 7.x
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console"], // Remove console.logs in production
    },
  },
});
