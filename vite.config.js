// vite.config.js
import { defineConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Agrupa os pacotes React
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // Agrupa os pacotes de i18n
          if (id.includes('node_modules/react-i18next/') || 
              id.includes('node_modules/i18next/')) {
            return 'i18n-vendor';
          }

          // Agrupa o react-helmet-async
          if (id.includes('node_modules/react-helmet-async/')) {
            return 'helmet-vendor';
          }

          // Deixa o restante ser gerenciado pelo splitVendorChunkPlugin
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    cssCodeSplit: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-i18next']
  }
});