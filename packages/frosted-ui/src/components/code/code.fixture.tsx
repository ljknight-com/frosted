import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';
import { Code, codePropDefs } from '.';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const [children] = useFixtureInput('children', 'Code');
    const props = useComponentControls('Code');
    return <Code {...props}>{children}</Code>;
  },

  Variant() {
    const args = { children: 'Code', size: codePropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
        <Code {...args} variant="solid">
          console.log()
        </Code>
        <Code {...args} variant="soft">
          console.log()
        </Code>
        <Code {...args} variant="outline">
          console.log()
        </Code>
        <Code {...args} variant="ghost">
          console.log()
        </Code>
      </div>
    );
  },

  Size() {
    const args = { children: 'Code' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Code {...args} size="1">
          console.log()
        </Code>
        <Code {...args} size="2">
          console.log()
        </Code>
        <Code {...args} size="3">
          console.log()
        </Code>
        <Code {...args} size="4">
          console.log()
        </Code>
        <Code {...args} size="5">
          console.log()
        </Code>
        <Code {...args} size="6">
          console.log()
        </Code>
        <Code {...args} size="7">
          console.log()
        </Code>
        <Code {...args} size="8">
          console.log()
        </Code>
        <Code {...args} size="9">
          console.log()
        </Code>
      </div>
    );
  },

  Color() {
    const args = { children: 'Code', size: codePropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
        <Code {...args} color="indigo">
          console.log()
        </Code>
        <Code {...args} color="rose">
          console.log()
        </Code>
        <Code {...args} color="cyan">
          console.log()
        </Code>
        <Code {...args} color="orange">
          console.log()
        </Code>
      </div>
    );
  },

  'High Contrast'() {
    const args = { children: 'Code', size: codePropDefs.size.default };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
          <Code {...args} variant="solid">
            console.log()
          </Code>
          <Code {...args} variant="soft">
            console.log()
          </Code>
          <Code {...args} variant="outline">
            console.log()
          </Code>
          <Code {...args} variant="ghost">
            console.log()
          </Code>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
          <Code {...args} variant="solid" highContrast>
            console.log()
          </Code>
          <Code {...args} variant="soft" highContrast>
            console.log()
          </Code>
          <Code {...args} variant="outline" highContrast>
            console.log()
          </Code>
          <Code {...args} variant="ghost" highContrast>
            console.log()
          </Code>
        </div>
      </div>
    );
  },
};
