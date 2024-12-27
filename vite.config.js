import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Electron uchun nisbiy yo'l
  build: {
    outDir: 'dist', // Build fayllar qayerda saqlanishini ko'rsating
  },
});
