import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: { host: "0.0.0.0", port: 8080 },
  resolve: {
    alias: { "@": path.resolve(rootDir, "./src") },
  },
});
