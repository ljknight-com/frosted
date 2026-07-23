import React from 'react';
import { Card, Inset, Text } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default function InsetFixture() {
  const props = useComponentControls('Inset', { side: 'top', pb: 'current' });
  return (
    <Card size="2" style={{ maxWidth: 280 }}>
      <Inset {...props}>
        <div style={{ height: 96, background: 'var(--accent-alpha-200)' }} />
      </Inset>
      <Text size="2">The tinted area bleeds to the card&apos;s edges; this text keeps the normal padding.</Text>
    </Card>
  );
}
