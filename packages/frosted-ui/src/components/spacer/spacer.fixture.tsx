import React from 'react';
import { Button, HStack, Spacer } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default function SpacerFixture() {
  const args = useComponentControls('Spacer', { minLength: 24 });
  return (
    <HStack style={{ width: 400 }}>
      <Button>Leading</Button>
      <Spacer {...args} />
      <Button>Trailing</Button>
    </HStack>
  );
}
