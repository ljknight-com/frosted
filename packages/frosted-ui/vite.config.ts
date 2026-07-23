import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), 'src');

// This config exists for the cosmos renderer (react-cosmos-plugin-vite picks it up
// automatically); nothing else in the package builds with vite.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // The demos are shown to users as copy-pasteable source, so they import from the
    // public package name; alias it to src/ (never dist/).
    alias: [
      { find: /^@aussieljk\/frosted\/icons\/(.+)$/, replacement: `${srcDir}/icons/adapters/$1` },
      { find: /^@aussieljk\/frosted$/, replacement: srcDir },
    ],
    // react-aria keeps global state (focus-visible in particular) in module scope, so two
    // copies in one page throw "Illegal invocation" and blank the renderer.
    dedupe: ['react', 'react-dom', 'react-aria', 'react-aria-components', '@base-ui/react'],
  },
  // A dep discovered after startup forces a mid-session re-optimize, which leaves the page
  // holding two generations of the same pre-bundled chunk (for react-aria that means two
  // copies of its focus-visible global). List the fixture entries and the full react-aria
  // surface explicitly so the optimizer finishes in one pass.
  optimizeDeps: {
    entries: ['src/components/**/*.fixture.tsx', 'demos/*.fixture.tsx', 'cosmos/**/*.tsx'],
    include: ['@base-ui/react', 'react-aria-components'],
  },
});
