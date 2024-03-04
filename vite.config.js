import { defineConfig, resolveConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        holden: resolve(__dirname, "holden/index.html"),
        holmes: resolve(__dirname, "holmes/index.html"),
        case: resolve(__dirname, "case/index.html"),
        brody: resolve(__dirname, "brody/index.html"),
      },
    },
  },
});
