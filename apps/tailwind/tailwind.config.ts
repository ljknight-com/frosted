import { frostedThemePlugin } from '@aussieljk/frosted';

export default {
  darkMode: ['class'],
  content: ['./index.html', './main.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [frostedThemePlugin()],
};
