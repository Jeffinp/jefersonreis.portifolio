import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: 'terser', // Ativa a minificação com Terser para reduzir o tamanho do JS final
  },
  css: {
    postcss: './postcss.config.cjs', // Referência ao arquivo de configuração do PostCSS
  },
});
