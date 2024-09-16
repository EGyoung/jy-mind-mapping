import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["./inspect.cjs"],
      },
    }),
  ],
  server: {
    open: true,
    port: 3456,
  },
  resolve: {
    alias: {
      "@jy/mind-mapping": path.resolve(__dirname, "../mindmapping/src"),
    },
  },
});
