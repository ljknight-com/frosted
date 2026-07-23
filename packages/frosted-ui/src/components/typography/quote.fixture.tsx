import React from 'react';
import { Quote } from './quote';
import { Text } from './text';

export default function QuoteFixture() {
  const args = {};
  return (
    <Text>
      His famous quote, <Quote {...args}>Styles come and go. Good design is a language, not a style</Quote>, elegantly
      summs up Massimo’s philosophy of design.
    </Text>
  );
}
