//vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: 'terser', // Minificação agressiva com Terser para reduzir o tamanho final do JS
    rollupOptions: {
      treeshake: true, // Remove código não utilizado para reduzir o JS final
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separa dependências externas em um arquivo separado
          }
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.cjs', // Otimização do CSS via PostCSS
  },
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.log e debugger em produção
  },
});