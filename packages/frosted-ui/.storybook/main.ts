import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '../src');

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
    }),
};
export default config;
