import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from 'node:url';
import { asyncCSS } from "./vite-plugin-async-css.js";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: "/",

  plugins: [
    react(), 
    tailwindcss(), 
    asyncCSS(),
    // Gzip compression for production builds
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false, // Keep original files
      verbose: true,
      disable: false,
    }),
    // Brotli compression for better compression ratio
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false, // Keep original files
      verbose: true,
      disable: false,
    }),
  ],

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
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
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