import React from 'react';
import { Separator, Typography, separatorPropDefs } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const args = useComponentControls('Separator');
    return (
      <Typography.Text size="2">
        Tools for building high-quality, accessible UI.
        <Separator {...args} orientation="horizontal" size="4" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          Themes
          <Separator {...args} orientation="vertical" />
          Primitives
          <Separator {...args} orientation="vertical" />
          Icons
          <Separator {...args} orientation="vertical" />
          Colors
        </div>
      </Typography.Text>
    );
  },

  Size() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Separator {...args} orientation="horizontal" size="4" />
          <Separator {...args} orientation="horizontal" size="3" />
          <Separator {...args} orientation="horizontal" size="2" />
          <Separator {...args} orientation="horizontal" size="1" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', height: 96 }}>
          <Separator {...args} orientation="vertical" size="4" />
          <Separator {...args} orientation="vertical" size="3" />
          <Separator {...args} orientation="vertical" size="2" />
          <Separator {...args} orientation="vertical" size="1" />
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Separator {...args} color="indigo" size="3" />
        <Separator {...args} color="cyan" size="3" />
        <Separator {...args} color="orange" size="3" />
        <Separator {...args} color="rose" size="3" />
      </div>
    );
  },

  Orientation() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Separator {...args} orientation="horizontal" />
        <Separator {...args} orientation="vertical" />
      </div>
    );
  },
};
