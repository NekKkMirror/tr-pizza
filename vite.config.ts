import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import vitePluginSvgr from "vite-plugin-svgr";
import path from "node:path";

const PORT: number = Number(process.env.PORT) || 3000;

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: "./",
  build: {
    outDir: "./docs",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), viteTsconfigPaths(), vitePluginSvgr()],
  server: {
    open: true,
    host: true,
    port: PORT,
    watch: {
      usePolling: true,
    },
  },
});
