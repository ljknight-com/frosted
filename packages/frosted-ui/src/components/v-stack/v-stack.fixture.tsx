import React from 'react';
import { VStack } from '.';
import { useComponentControls } from '../../../cosmos/controls';

const Box = ({ width, children }: { width: number; children: React.ReactNode }) => (
  <div
    style={{
      width,
      height: 40,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 8,
      background: 'var(--accent-alpha-200)',
    }}
  >
    {children}
  </div>
);

export default function VStackFixture() {
  const props = useComponentControls('VStack', { spacing: 8 });
  return (
    <VStack {...props}>
      <Box width={64}>1</Box>
      <Box width={128}>2</Box>
      <Box width={96}>3</Box>
    </VStack>
  );
}
