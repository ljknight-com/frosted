/**
 * Fixture controls seeded from `cosmos/generated/component-props.json` (the props-gen
 * output). `useComponentControls('Button')` registers one cosmos input per controllable
 * prop — enums become selects, booleans/strings/numbers become inputs — and returns the
 * current values as a props object, so a component's playground fixture is one line.
 *
 * Hook rules: the set of hooks called depends only on the generated JSON and the
 * `defaults` argument, both constant for the lifetime of a fixture, so call order is
 * stable across renders even though the calls happen in a loop.
 */
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import data from './generated/component-props.json';

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
}

interface ComponentEntry {
  description?: string;
  props: PropInfo[];
}

const components = (data as { components: Record<string, ComponentEntry> }).components;

// JSON keys use dotted part names (`Tabs.Root`) while fixtures pass flat names (`TabsRoot`).
const byFlatName = new Map<string, ComponentEntry>();
for (const [key, entry] of Object.entries(components)) {
  byFlatName.set(key.replace(/\./g, ''), entry);
}

const UNION_OF_STRING_LITERALS = /^'[^']*'(\s*\|\s*'[^']*')*$/;
const UNSET = '(unset)';

const unquote = (value: string) => value.replace(/^'|'$/g, '');

// The index-signature `any` return lets fixtures spread the result onto components with
// required props (the values really are heterogeneous — TS can't know which props exist).
// oxlint-disable-next-line no-explicit-any
export function useComponentControls(component: string, defaults: Record<string, unknown> = {}): Record<string, any> {
  const entry = byFlatName.get(component.replace(/\./g, ''));
  if (!entry) throw new Error(`useComponentControls: no generated props for "${component}"`);

  const values: Record<string, unknown> = {};
  for (const prop of entry.props) {
    if (prop.name === 'children') continue;
    const seed = defaults[prop.name];

    if (UNION_OF_STRING_LITERALS.test(prop.type)) {
      const options = prop.type.split('|').map((member) => unquote(member.trim()));
      if (options.length < 2) continue;
      const fallback = (seed as string | undefined) ?? (prop.default ? unquote(prop.default) : UNSET);
      if (!options.includes(fallback)) options.unshift(UNSET);
      const [value] = useFixtureSelect(prop.name, {
        options,
        defaultValue: options.includes(fallback) ? fallback : UNSET,
      });
      if (value !== UNSET) values[prop.name] = value;
    } else if (prop.type === 'boolean') {
      const [value] = useFixtureInput(prop.name, (seed as boolean | undefined) ?? prop.default === 'true');
      values[prop.name] = value;
    } else if (prop.type === 'string') {
      const [value] = useFixtureInput(prop.name, (seed as string | undefined) ?? unquote(prop.default ?? ''));
      if (value !== '') values[prop.name] = value;
    } else if (prop.type === 'number' && (seed !== undefined || prop.default !== undefined)) {
      const [value] = useFixtureInput(prop.name, (seed as number | undefined) ?? Number(prop.default));
      values[prop.name] = value;
    }
  }
  return values;
}
