import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The brand link in the sidebar header points at the machine-readable docs
// (everything runs under the frosted.localhost tenant via portless).
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Frosted UI',
    brandUrl: 'https://frosted.localhost/llms.txt',
    brandTarget: '_self',
  }),
});
