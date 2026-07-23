import React from 'react';
import { Em, Text } from '..';

export default function EmFixture() {
  const args = {
    children: 'Em',
  };
  return (
    <Text>
      We <Em {...args}>had</Em> to do something about it.
    </Text>
  );
}
