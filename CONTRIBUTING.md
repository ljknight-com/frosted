# Contributing to Frosted UI

If you're reading this thank you for your interest in contributing to Frosted UI. Thank you for helping us make Frosted great! Here are a few guidelines to help contribute.

- Before opening a PR be sure to search exiting [PRs](https://github.com/aussieljk/frosted/pulls) or [issues](https://github.com/aussieljk/frosted/issues) for an open or closed item that related to your submission.

## PR Titles

We use semantic PR titles. Learn more about them [here](https://flank.github.io/flank/pr_titles/).

Example:

> feat(button): Add right icon

## Formatting & Linting

Formatting is [oxfmt](https://oxc.rs) (config in `.oxfmtrc.json`); linting is ESLint + Stylelint, with [oxlint](https://oxc.rs) as a fast first pass. A [lefthook](https://lefthook.dev) pre-commit hook (installed automatically by `bun install`) runs oxfmt and oxlint on staged files.

- Format everything: `bun run format`
- Lint everything: `bun run lint`
- Run the full local check (lint, typecheck, build, publint, attw): `bun run check`

## New components

Scaffold a component and all of its wiring (component files, barrel export, CSS aggregate, docs demo + page + sidebar) with:

```
bun run new:component <kebab-name> [--namespace] [--no-docs]
```

Use `--namespace` for multi-part components (`<Name>.Root` / `<Name>.Item`, exported via `export * as`).

## Updating Storybook

When creating new components or updating existing component APIs be sure to update the storybook.

You can run the storybook locally by running `bun run --filter="@aussieljk/frosted" storybook` and then navigating to `https://storybook.frosted.localhost` (served via [portless](https://www.npmjs.com/package/portless)).

## If something is mysteriously broken

Run `bun run doctor`. Under the hoisted linker, stale nested `packages/*/node_modules` dirs from older installs can shadow the root binaries (a package silently using an ancient `tsc` or `eslint`). `doctor --fix` deletes them.

## Sharp edges

Non-obvious constraints — breaking any of these fails silently or in confusing ways:

- **`scripts/fix-namespace-exports.ts` must run after every tsdown build** (wired into `build:js`). Rolldown lowers `export * as Tabs` into materialized getter objects, which break React Server Components (`<Tabs.Root>` renders undefined in Next: "Element type is invalid … got: undefined"). Note `tsdown --watch` (dev) skips the fix, so a dev-built `dist/` may misbehave in consumers until you run a full `bun run build`.
- **`sideEffects` in `packages/frosted-ui/package.json` must stay `["./dist/icons/adapters/*"]`**, not `false`. The icon adapter subpaths (`@aussieljk/frosted/icons/lucide` etc.) register themselves on import; `sideEffects: false` silently tree-shakes them.
- **TypeScript 7 (native compiler) is the repo default**, and it has no JS compiler API. The seemingly redundant classic-TS pins are load-bearing: `apps/docs` has a scoped classic TS (prop-table generation needs the compiler API), and the root `overrides` pin `ts-api-utils > typescript` for @typescript-eslint. Don't "clean up" either of them.
- **`.stylelintrc.js` must stay `.js`** — stylelint's TS config loader calls classic-TS APIs that the TS7 native compiler doesn't export.
- **`src/styles/tokens/tailwind-color.css` is hand-maintained runtime CSS** (per-palette oklch seeds + `:where()` blocks computing all 12 steps via color-mix/relative color syntax). There is no generator anymore; edit it by hand. Tailwind palettes are prefixed `tw-` (`tw-indigo`) to coexist with the Radix scales.
- **Icon adapters in `src/icons/adapters/` are generated** — edit `scripts/icon-map.ts` and run `bun run generate:icon-adapters`; never edit the adapters directly.
- **`lucide-react` is v1.x** — the adapter uses v1 names (`House`, `Funnel`, `TriangleAlert`); pre-1.0 aliases like `Home` no longer exist despite the permissive peer range.
- **Docs demos live in the registry** (`apps/docs/src/demos/index.ts`), consumed by both `/examples` and per-page `<Demo id>` blocks — add demos there, never inline them in MDX. Prop tables are generated from exports by `bun run generate:props`; the `<name>PropDefs` naming convention is what backfills defaults and descriptions.
