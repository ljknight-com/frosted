import React from 'react';
import { Em } from './em';
import { Text } from './text';

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
