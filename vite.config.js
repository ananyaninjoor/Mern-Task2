import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This config tells Vite's dev server to forward any request starting
// with /api to our Express backend at http://localhost:5000.
// That way, the React app can just call fetch("/api/auth/signup")
// without worrying about the backend's port.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});
