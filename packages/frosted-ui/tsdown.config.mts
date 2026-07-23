import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.fixture.*', '!src/cosmos.decorator.tsx'],
  format: ['esm'],
  outDir: 'dist',
  unbundle: true,
  dts: true,
  sourcemap: true,
  platform: 'neutral',
});
