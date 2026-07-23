import React from 'react';
import { Strong, Text } from '..';

export default function StrongFixture() {
  const args = {};
  return (
    <Text>
      The most important thing to remember is, <Strong {...args}>stay positive</Strong>.
    </Text>
  );
}
