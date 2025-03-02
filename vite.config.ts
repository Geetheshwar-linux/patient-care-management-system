import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
  rollupOptions: {
    external: ["@supabase/supabase-js"],
    },
  },
  server: {
    host: '0.0.0.0', // Ensure it's accessible
    port: Number(process.env.PORT) || 5173, // Use Render's assigned port
    allowedHosts: ['patient-care-management-system.onrender.com'], // Add your Render domain
  }
});
