import React from 'react';
import { CircularProgress, circularProgressPropDefs } from '.';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const { value, ...props } = useComponentControls('CircularProgress', { value: 40 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
        <CircularProgress value={value} {...props} />
      </div>
    );
  },

  Size() {
    const args = {
      size: circularProgressPropDefs.size.default,
      color: circularProgressPropDefs.color.default,
      value: 40,
      max: 100,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
        {circularProgressPropDefs.size.values.map((size) => (
          <CircularProgress {...args} size={size} key={size} />
        ))}
      </div>
    );
  },

  Color() {
    const args = {
      size: circularProgressPropDefs.size.default,
      color: circularProgressPropDefs.color.default,
      value: 40,
      max: 100,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
        <CircularProgress {...args} color="indigo" value={15} />
        <CircularProgress {...args} color="cyan" value={50} />
        <CircularProgress {...args} color="orange" value={95} />
        <CircularProgress {...args} color="rose" value={100} />
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      size: circularProgressPropDefs.size.default,
      color: circularProgressPropDefs.color.default,
      value: 40,
      max: 100,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
          <CircularProgress {...args} highContrast={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
          <CircularProgress {...args} highContrast />
        </div>
      </div>
    );
  },
};
