import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The brand link in the sidebar header points back at the docs site
// (everything runs under the frosted.localhost tenant via portless).
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Frosted UI ↗ docs',
    brandUrl: 'https://frosted.localhost',
    brandTarget: '_self',
  }),
});
