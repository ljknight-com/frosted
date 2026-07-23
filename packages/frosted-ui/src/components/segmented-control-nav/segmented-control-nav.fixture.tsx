import React from 'react';
import { Code, SegmentedControlNav, Text } from '..';

export default {
  Default() {
    const args = {};
    return (
      <div style={{ width: 600 }}>
        <SegmentedControlNav.Root {...args}>
          <SegmentedControlNav.Link active={true} href="#">
            Account
          </SegmentedControlNav.Link>
          <SegmentedControlNav.Link href="#">Documents</SegmentedControlNav.Link>
          <SegmentedControlNav.Link href="#">Settings</SegmentedControlNav.Link>
        </SegmentedControlNav.Root>
      </div>
    );
  },

  'Render Prop (Client-Side Routing)'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Text>
          Use the <Code>render</Code> prop to integrate with your framework&apos;s router for client-side navigation.
        </Text>
        <SegmentedControlNav.Root {...args}>
          <SegmentedControlNav.Link active render={<a href="/account" />}>
            Account
          </SegmentedControlNav.Link>
          <SegmentedControlNav.Link render={<a href="/documents" />}>Documents</SegmentedControlNav.Link>
          <SegmentedControlNav.Link render={<a href="/settings" />}>Settings</SegmentedControlNav.Link>
        </SegmentedControlNav.Root>
        <Text size="1" color="gray">
          In a real app, replace <Code>{'<a />'}</Code> with your router&apos;s Link component, e.g.{' '}
          <Code>{'<NextLink href="/account" />'}</Code> for Next.js.
        </Text>
      </div>
    );
  },
};
