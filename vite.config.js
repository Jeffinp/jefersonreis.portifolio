import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.cjs',  // Referência ao arquivo de configuração do PostCSS
  },
});
