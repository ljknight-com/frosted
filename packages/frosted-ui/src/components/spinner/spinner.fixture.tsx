import React from 'react';
import { Code, Spinner, Switch, Text, spinnerPropDefs } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const props = useComponentControls('Spinner');
    return <Spinner {...props} />;
  },

  Size() {
    const args = {
      size: spinnerPropDefs.size.default,
      loading: spinnerPropDefs.loading.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Spinner {...args} size="1" />
        <Spinner {...args} size="2" />
        <Spinner {...args} size="3" />
        <Spinner {...args} size="4" />
        <Spinner {...args} size="5" />
        <Spinner {...args} size="6" />
      </div>
    );
  },

  'With children'() {
    const args = {
      size: spinnerPropDefs.size.default,
      loading: spinnerPropDefs.loading.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 640 }}>
        <Text>
          Use the <Code>loading</Code> prop to control whether the spinner or its children are displayed. Spinner
          preserves the dimensions of children when they are hidden and disables interactive elements.
        </Text>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <Spinner {...args} loading={true}>
            <Switch defaultChecked />
          </Spinner>

          <Spinner {...args} loading={false}>
            <Switch defaultChecked />
          </Spinner>
        </div>
      </div>
    );
  },
};
