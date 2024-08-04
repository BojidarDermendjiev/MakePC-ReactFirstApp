import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
<<<<<<< Updated upstream
=======
import { config } from "dotenv";

// Load environment variables from .env file
config();
>>>>>>> Stashed changes

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< Updated upstream
  
=======
  define: {
    // eslint-disable-next-line no-undef
    "process.env": process.env,
  },
>>>>>>> Stashed changes
});
