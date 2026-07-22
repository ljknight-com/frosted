import { Source } from '@storybook/addon-docs/blocks';
import React from 'react';

import { Theme } from '../../src/theme';
import { getDemo, type DemoEntry } from '../demos';

// The chrome around a demo sits outside `Theme`, so it can't use frosted tokens.
const BORDER = '1px solid rgba(128, 128, 128, 0.3)';

/** Renders a demo entry: live preview on top, its source code below. */
export function DemoView({ entry }: { entry: DemoEntry }) {
  const Component = entry.component;

  return (
    <div style={{ margin: '24px 0', border: BORDER, borderRadius: 12, overflow: 'hidden' }}>
      <Theme
        appearance="inherit"
        accentColor="blue"
        grayColor="gray"
        style={{
          display: 'flex',
          minHeight: 160,
          alignItems: 'center',
          justifyContent: 'center',
          overflowX: 'auto',
          padding: 32,
        }}
      >
        <Component />
      </Theme>
      <div style={{ borderTop: BORDER }}>
        {/* The explicit React import is a storybook build detail, not part of the example. */}
        <Source code={entry.source.replace(/^import React from 'react';\n/, '').trimEnd()} language="tsx" />
      </div>
    </div>
  );
}

/** MDX-facing component: `<Demo id="button" />`. */
export function Demo({ id }: { id: string }) {
  const entry = getDemo(id);
  if (!entry) throw new Error(`Unknown demo id: "${id}". Register it in .storybook/demos/index.ts.`);

  return <DemoView entry={entry} />;
}
