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
          // Separar bibliotecas principais
          'react-vendor': ['react', 'react-dom'],
          'i18n-vendor': ['react-i18next', 'i18next'],
          'ui-components': [
            './components/Header.jsx',
            './components/Footer.jsx',
            './components/ScrollToTopBtn.jsx'
          ],
          'main-containers': [
            './containers/Hero.jsx',
            './containers/About.jsx',
            './containers/Skills.jsx'
          ],
          'secondary-containers': [
            './containers/Services.jsx',
            './containers/Resume.jsx',
            './containers/Projects.jsx'
          ]
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