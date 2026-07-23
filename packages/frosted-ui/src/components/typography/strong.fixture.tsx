import React from 'react';
import { Strong } from './strong';
import { Text } from './text';

export default function StrongFixture() {
  const args = {};
  return (
    <Text>
      The most important thing to remember is, <Strong {...args}>stay positive</Strong>.
    </Text>
  );
}
