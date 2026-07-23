import { Source } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState, type ComponentType } from 'react';

import { Theme } from '../../src/theme';
import { getDemo, loadDemo, type DemoEntry, type LoadedDemo } from '../demos';

// The chrome around a demo sits outside `Theme`, so it can't use frosted tokens.
const BORDER = '1px solid rgba(128, 128, 128, 0.3)';

/** The frame renders immediately, so the page keeps its layout while the demo resolves. */
export function Frame({ children, pending }: { children?: React.ReactNode; pending?: boolean }) {
  return (
    <div
      // `bun run screenshot` waits for every demo to drop this attribute before capturing.
      data-demo-pending={pending ? '' : undefined}
      style={{ margin: '24px 0', border: BORDER, borderRadius: 12, overflow: 'hidden', minHeight: 224 }}
    >
      {children}
    </div>
  );
}

function DemoBody({ Component, source }: { Component: ComponentType; source: string }) {
  return (
    <>
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
        <Source code={source.replace(/^import React from 'react';\n/, '').trimEnd()} language="tsx" />
      </div>
    </>
  );
}

/**
 * Loads a demo in an effect rather than through React.lazy/Suspense. That distinction matters:
 * a demo module is the first thing to pull in the component library, and react-aria sets up
 * global focus tracking at module scope. Evaluating that during React's render phase throws
 * "Illegal invocation" and blanks the page, so the import is kept out of render entirely.
 */
function useDemo(id: string): LoadedDemo | undefined {
  const [loaded, setLoaded] = useState<LoadedDemo>();

  useEffect(() => {
    let live = true;
    loadDemo(id).then((demo) => {
      if (live) setLoaded(demo);
    });
    return () => {
      live = false;
    };
  }, [id]);

  return loaded;
}

/** Renders a demo entry: live preview on top, its source code below. */
export function DemoView({ entry }: { entry: DemoEntry }) {
  const demo = useDemo(entry.id);

  if (!demo) return <Frame pending />;
  return (
    <Frame>
      <DemoBody Component={demo.Component} source={demo.source} />
    </Frame>
  );
}

/** MDX-facing component: `<Demo id="button" />`. */
export function Demo({ id }: { id: string }) {
  const entry = getDemo(id);
  if (!entry) throw new Error(`Unknown demo id: "${id}". Register it in .storybook/demos/index.ts.`);

  return <DemoView entry={entry} />;
}
