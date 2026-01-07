import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from 'node:url';
import { asyncCSS } from "./vite-plugin-async-css.js";

export default defineConfig({
  base: "/",

  plugins: [react(), tailwindcss(), asyncCSS()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "es2018",
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    minify: "esbuild",
    emptyOutDir: true,
    // Optimize for better chunking
    cssCodeSplit: true,
    // Reduce initial bundle size
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep React + Scheduler together (prevents production init-order issues)
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/") ||
            id.includes("node_modules/use-sync-external-store/") ||
            id.includes("node_modules/react-is/")
          ) {
            return "vendor-react";
          }
          if (id.includes('react-router')) {
            return 'vendor-react-router';
          }
          
          // Split UI libraries
          if (id.includes('antd')) {
            return 'vendor-antd';
          }
          if (id.includes('@radix-ui')) {
            return 'vendor-radix';
          }
          
          // Split animation libraries
          if (id.includes('gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-framer-motion';
          }
          if (id.includes('motion') && !id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('ogl') || id.includes('lenis') || id.includes('aos')) {
            return 'vendor-animations-extra';
          }
          
          // Split icons
          if (id.includes('lucide-react')) {
            return 'vendor-lucide';
          }
          if (id.includes('react-icons')) {
            return 'vendor-react-icons';
          }
          
          // Split utilities
          if (id.includes('axios') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'vendor-utils';
          }
          
          // Split i18n
          if (id.includes('i18next')) {
            return 'vendor-i18n';
          }
          
          // Split forms and styling
          if (id.includes('styled-components') || id.includes('prop-types')) {
            return 'vendor-forms';
          }
          
          // Split other large dependencies
          if (id.includes('swiper')) {
            return 'vendor-swiper';
          }
          if (id.includes('zustand')) {
            return 'vendor-state';
          }
          if (id.includes('react-scroll')) {
            return 'vendor-scroll';
          }
          if (id.includes('react-window')) {
            return 'vendor-window';
          }
          if (id.includes('react-country-flag')) {
            return 'vendor-flags';
          }
          
          // Node modules chunk for smaller libraries
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
          
          // Static assets chunks (like XML files)
          if (id.includes('.xml?raw')) {
            return 'assets-xml';
          }
          if (id.includes('.webp')) {
            return 'assets-images';
          }
        },
        chunkFileNames: () => {
          return `js/[name]-[hash].js`;
        },
        // Optimize chunk splitting
        experimentalMinChunkSize: 10000,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash].[ext]`;
          }
          if (/woff|woff2|ttf|otf|eot/i.test(ext)) {
            return `fonts/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        }
      }
    }
  }
  ,

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },
});