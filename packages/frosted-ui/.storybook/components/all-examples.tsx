import React, { useEffect, useRef, useState } from 'react';

import { demos, type DemoEntry } from '../demos';
import { DemoView, Frame } from './demo';

/**
 * One demo section. Mounting all 80 at once made this the heaviest page in the storybook, so a
 * section only renders its demo once it is near the viewport. The empty frame reserves the same
 * height, which keeps scroll position stable as sections fill in.
 *
 * Deliberately no `data-demo-pending` on the placeholder: that attribute means "mounted but still
 * resolving", and readiness checks wait for it to clear. An off-screen section isn't pending —
 * it hasn't been asked for yet.
 */
function DemoSection({ demo }: { demo: DemoEntry }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (shown || !section) return;

    // A generous margin so demos are ready by the time they scroll into view, and so hiding every
    // other section (what `bun run screenshot` does) always brings the survivor into range.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShown(true);
      },
      { rootMargin: '800px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <section ref={ref} id={demo.id}>
      <h2>{demo.title}</h2>
      {shown ? <DemoView entry={demo} /> : <Frame />}
    </section>
  );
}

/** Every registered demo on one page — the kitchen sink. */
export function AllExamples() {
  return (
    <>
      {demos.map((demo) => (
        <DemoSection key={demo.id} demo={demo} />
      ))}
    </>
  );
}
