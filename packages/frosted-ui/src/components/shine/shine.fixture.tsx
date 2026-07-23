import React from 'react';
import { Shine, Text } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default function ShineFixture() {
  const props = useComponentControls('Shine', { puffyness: '2' });
  return (
    <Shine {...props}>
      <Text size="9" weight="bold">
        🧸☔️ Shine! ✨👻
      </Text>
    </Shine>
  );
}
