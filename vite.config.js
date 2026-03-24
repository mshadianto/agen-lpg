import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/agen-lpg/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
