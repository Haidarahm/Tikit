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

    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            // React and React DOM
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // GSAP (large animation library)
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // Animation libraries
            if (id.includes('framer-motion') || id.includes('motion') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            // UI libraries
            if (id.includes('antd') || id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            // Swiper
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            // i18n
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }
            // Other large vendors
            if (id.includes('axios') || id.includes('zustand')) {
              return 'vendor-utils';
            }
            // Everything else from node_modules
            return 'vendor';
          }
        },
      },
    },

    minify: "esbuild",
    emptyOutDir: true,
  },

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },
});