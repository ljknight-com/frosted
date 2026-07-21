// Guards for the two known silent-breakage footguns of the published package.
// See CONTRIBUTING.md "Sharp edges".
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const pkgRoot = new URL('..', import.meta.url).pathname;
const distIndex = `${pkgRoot}dist/index.js`;

describe('package guards', () => {
  it('keeps icon adapters in sideEffects so bundlers do not tree-shake their registration', () => {
    const pkg = JSON.parse(readFileSync(`${pkgRoot}package.json`, 'utf8'));
    expect(pkg.sideEffects).toEqual(['./dist/icons/adapters/*']);
  });

  describe.skipIf(!existsSync(distIndex))('dist output', () => {
    // Materialized namespace objects (`x_exports = __exportAll({...})`) break React
    // Server Components: <Tabs.Root> renders undefined across a client-reference
    // boundary. fix-namespace-exports.ts rewrites them back to real `export * as`.
    // NOTE: `tsdown --watch` (dev) skips that script — if this fails locally,
    // run `bun run build` first.
    it('ships real `export * as` namespaces, not materialized getter objects', () => {
      const src = readFileSync(distIndex, 'utf8');
      expect(src).toMatch(/export \* as Tabs from/);
      expect(src).not.toContain('__exportAll(');
      expect(src).not.toMatch(/\w+_exports/);
    });
  });
});
