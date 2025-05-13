import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/AQ-50/',
  server: {
    port: 3000,
  },
  css: {
    postcss: './postcss.config.js',
  },
}); 