import { demos } from '@/demos/registry';
import { Demo } from './demo';

/** Every live demo on one page, in name order — the old Storybook "Examples" gallery. */
export function AllExamples() {
  return (
    <div>
      {Object.keys(demos)
        .sort()
        .map((name) => (
          <section key={name}>
            <h2>{name}</h2>
            <Demo name={name} />
          </section>
        ))}
    </div>
  );
}
