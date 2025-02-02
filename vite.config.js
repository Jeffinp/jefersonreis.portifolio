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
        manualChunks: {
          // Agrupando por funcionalidade ao invés de arquivos específicos
          'react-vendor': ['react', 'react-dom'],
          'i18n-vendor': ['react-i18next', 'i18next'],
          'helmet': ['react-helmet-async']
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
