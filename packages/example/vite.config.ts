import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // plugins: [react()],
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
