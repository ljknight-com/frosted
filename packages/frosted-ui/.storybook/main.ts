import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '../src');

// Under portless the dev server sits behind an HTTPS proxy on 443, but vite still tells the
// browser to open its HMR socket on the private port — so the socket never connects. Vite's
// only way to recover from optimizing newly-discovered deps is a full-reload over that socket,
// so without this the first load of a docs page dies on "Failed to fetch dynamically imported
// module" and stays broken until a manual refresh.
const portlessUrl = process.env.PORTLESS_URL;
const hmr = portlessUrl ? { protocol: 'wss', host: new URL(portlessUrl).hostname, clientPort: 443 } : undefined;

const config: StorybookConfig = {
  stories: ['./**/*.mdx', './**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  // Serves the generated llms.txt / llms-full.txt at the site root.
  staticDirs: ['./public'],

  core: {
    disableTelemetry: true,
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    // react-docgen-typescript requires the classic TS compiler API, which the
    // installed TypeScript 7 (native compiler) no longer provides.
    reactDocgen: 'react-docgen',
  },

  // The demos in .storybook/demos are shown to users as copy-pasteable source, so they import
  // from the public package name; alias it to src/ (never dist/) the way the docs app did.
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: [
          { find: /^@aussieljk\/frosted\/icons\/(.+)$/, replacement: `${srcDir}/icons/adapters/$1` },
          { find: /^@aussieljk\/frosted$/, replacement: srcDir },
        ],
      },
      server: { hmr },
      // The docs pages reach the whole library through .storybook/demos, but vite's dep scanner
      // can't read .mdx — so without these entries those deps are discovered one request at a
      // time, forcing a re-optimize mid-render. Scanning them up front keeps first load stable.
      optimizeDeps: { entries: ['.storybook/demos/*.tsx', '.storybook/components/*.tsx'] },
    }),
};
export default config;
