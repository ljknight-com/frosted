import React from 'react';
import { Shine, Typography } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default function ShineFixture() {
  const props = useComponentControls('Shine', { puffyness: '2' });
  return (
    <Shine {...props}>
      <Typography.Text size="9" weight="bold">
        🧸☔️ Shine! ✨👻
      </Typography.Text>
    </Shine>
  );
}
