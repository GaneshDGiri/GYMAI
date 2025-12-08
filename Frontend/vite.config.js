import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- This line is required for Tailwind v4
  ],
  optimizeDeps: {
    include: ["recharts", "react-is"]
  }
});