import React from 'react';
import { Grid, Text } from '..';
import { useComponentControls } from '../../../cosmos/controls';

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      minWidth: 48,
      padding: 8,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 8,
      background: 'var(--accent-alpha-200)',
    }}
  >
    {children}
  </div>
);

export default function GridFixture() {
  const props = useComponentControls('Grid', { horizontalSpacing: 8, verticalSpacing: 8 });
  return (
    <Grid {...props}>
      <Grid.Row>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
      </Grid.Row>
      <Grid.Row>
        <Cell>4</Cell>
        <Cell>5</Cell>
      </Grid.Row>
      <Text size="2" color="gray">
        Spans every column
      </Text>
    </Grid>
  );
}
