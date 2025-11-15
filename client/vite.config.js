import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

const resolve = (path) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": {},
  },
  build: { sourcemap: true },
  resolve: {
    alias: {
      "@": resolve("./src")
    }
  }
});
