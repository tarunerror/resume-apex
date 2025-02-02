import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/resume-apex/', // Match your GitHub repo name
  plugins: [react()],
});