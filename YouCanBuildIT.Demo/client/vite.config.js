// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";

// Load environment variables from .env file
config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.js",
  },
});
