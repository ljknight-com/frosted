import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // the frosted watch build rewrites dist/ while the dev server runs;
    // pre-bundling it leaves Vite pointing at stale chunks
    exclude: ['@aussieljk/frosted'],
  },
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        dashboard: 'index.html',
        main: 'main.html',
      },
    },
  },
});
