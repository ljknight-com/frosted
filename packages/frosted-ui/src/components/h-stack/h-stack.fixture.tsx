import React from 'react';
import { HStack } from '.';
import { useComponentControls } from '../../../cosmos/controls';

const Box = ({ height, children }: { height: number; children: React.ReactNode }) => (
  <div
    style={{
      height,
      width: 64,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 8,
      background: 'var(--accent-alpha-200)',
    }}
  >
    {children}
  </div>
);

export default function HStackFixture() {
  const props = useComponentControls('HStack', { spacing: 8 });
  return (
    <HStack {...props}>
      <Box height={40}>1</Box>
      <Box height={80}>2</Box>
      <Box height={56}>3</Box>
    </HStack>
  );
}
