import React from 'react';
import { TextArea, textAreaPropDefs } from '.';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const props = useComponentControls('TextArea');
    return (
      <div style={{ width: 300 }}>
        <TextArea placeholder="Reply to comment…" {...props} />
      </div>
    );
  },

  Size() {
    const args = {
      size: textAreaPropDefs.size.default,
      variant: textAreaPropDefs.variant.default,
      color: textAreaPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 500 }}>
        <TextArea placeholder="Reply to comment…" {...args} size="1" />
        <TextArea placeholder="Reply to comment…" {...args} size="2" />
        <TextArea placeholder="Reply to comment…" {...args} size="3" />
        <TextArea placeholder="Reply to comment…" {...args} size="4" />
      </div>
    );
  },

  Variant() {
    const args = {
      size: textAreaPropDefs.size.default,
      variant: textAreaPropDefs.variant.default,
      color: textAreaPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 500 }}>
        <TextArea placeholder="Reply to comment…" {...args} variant="surface" />
        <TextArea placeholder="Reply to comment…" {...args} variant="soft" />
      </div>
    );
  },

  Color() {
    const args = {
      size: textAreaPropDefs.size.default,
      variant: textAreaPropDefs.variant.default,
      color: textAreaPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 500 }}>
        <TextArea placeholder="Reply to comment…" {...args} color="blue" />
        <TextArea placeholder="Reply to comment…" {...args} color="green" />
        <TextArea placeholder="Reply to comment…" {...args} color="red" />
      </div>
    );
  },
};
