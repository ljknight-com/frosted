import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';
import { Blockquote } from '../../../src/components/blockquote';
import { useComponentControls } from '../../../cosmos/controls';

export default function BlockquoteFixture() {
  const [children] = useFixtureInput('children', 'I love how we have the freedom to explore skeuomorphism');
  const props = useComponentControls('Blockquote');
  return <Blockquote {...props}>{children}</Blockquote>;
}
