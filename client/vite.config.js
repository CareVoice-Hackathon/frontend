import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  json: {
    namedExports: true,
    stringify: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/api/", // The target server
        changeOrigin: true, // Set this to true if you need to change the origin
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the base path from the request URL
      },
      "/sandbox-api": {
        target: "http://localhost:8000", // The target server
        changeOrigin: true, // Set this to true if you need to change the origin
        rewrite: (path) => path.replace(/^\/sandbox-api/, ""), // Remove the base path from the request URL
      },
    },
  },
});
