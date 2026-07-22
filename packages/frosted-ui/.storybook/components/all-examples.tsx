import React from 'react';

import { demos } from '../demos';
import { DemoView } from './demo';

/** Every registered demo on one page — the kitchen sink. */
export function AllExamples() {
  return (
    <>
      {demos.map((demo) => (
        <section key={demo.id} id={demo.id}>
          <h2>{demo.title}</h2>
          <DemoView entry={demo} />
        </section>
      ))}
    </>
  );
}
