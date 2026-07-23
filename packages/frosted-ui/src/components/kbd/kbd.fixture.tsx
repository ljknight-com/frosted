import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';
import { Kbd } from '.';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const [children] = useFixtureInput('children', 'Shift + Tab');
    const props = useComponentControls('Kbd');
    return <Kbd {...props}>{children}</Kbd>;
  },

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div>
          <Kbd {...args} size="1">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="2">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="3">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="4">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="5">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="6">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="7">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="8">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="9">
            Shift + Tab
          </Kbd>
        </div>
      </div>
    );
  },
};
