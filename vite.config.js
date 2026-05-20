import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/CyberJude-Gpa-Studio/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
});
