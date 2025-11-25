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
          "vendor-3d": ["three", "ogl", "postprocessing"],
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
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
  },
});
