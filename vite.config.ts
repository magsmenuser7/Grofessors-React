import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/Grofessors-React/" : "/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
