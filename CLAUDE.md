# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint Commands

### Monorepo

- **Install**: `bun install`
- **Dev server**: `bun run dev [--no-open] [--kill]` (`scripts/dev.ts`; storybook through [portless](https://www.npmjs.com/package/portless), opens Safari when ready; `--kill` clears stale sessions)
- **Build**: `bun run build --filter=<app>`
- **Lint**: `bun run lint --filter=<app>`
- **Typecheck**: `bun run typecheck` (turbo, all packages; TypeScript 7)
- **Full check**: `bun run check` (lint, typecheck, build, publint, attw)
- **Screenshot every demo**: `bun run screenshot [--out <dir>] [--only stories|demos] [--filter <substr>] [--concurrency <n>]` (`scripts/screenshot-demos.ts`; headless via the `agent-browser` CLI, starts storybook itself if it isn't running, writes `screenshots/` + a contact-sheet `index.html`)
- **Scaffold a component**: `bun run new:component <kebab-name> [--namespace] [--no-docs]`
- **Regenerate prop tables**: `bun run generate:props` (also runs automatically from `bun run dev`)
- **Env problems**: `bun run doctor [--fix]` (stale nested node_modules, bun version)

### Dev URL (portless — no port numbers)

Storybook is the only site; it runs from this laptop under the `frosted.localhost` tenant:

- **Storybook**: <https://frosted.localhost> (`packages/frosted-ui`)
- **Machine-readable docs**: <https://frosted.localhost/llms.txt> and `/llms-full.txt`

### Frosted UI Package (`@aussieljk/frosted`, in `packages/frosted-ui`)

- **Build**: `bun run --filter="@aussieljk/frosted" build`
- **Lint**: `bun run --filter="@aussieljk/frosted" lint`
- **Storybook**: `bun run --filter="@aussieljk/frosted" storybook`

## Code Style Guidelines

- **TypeScript**: Strict typing, ES2020 modules, 120 char line width, 2-space indentation
- **React**: Functional components with hooks, JSX format
- **CSS**: Tailwind CSS v4, PostCSS with nesting/custom media/imports
- **Formatting**: Single quotes, semicolons required, trailing commas in multiline
- **Project**: Bun workspaces with Turborepo (`packages/*`, `tools/*`), Vite everywhere (no Next.js, no tests, no CI)
- **Commits**: Semantic commit messages (feat, fix, docs, style, refactor, perf, test, chore)
- **Quality**: oxlint for linting (root `.oxlintrc.json`), oxfmt for formatting (`bun run format`; lefthook pre-commit runs both on staged files), Storybook for component docs

## Publishing

The main package publishes to npm as `@aussieljk/frosted` (see `packages/frosted-ui`). Publishing happens locally from this laptop: bump the version in `packages/frosted-ui/package.json`, then `npm publish` from that directory (`prepublishOnly` runs lint + build). There is no CI/CD.

## Sharp Edges

Non-obvious constraints — breaking any of these fails silently or in confusing ways:

- **`scripts/fix-namespace-exports.ts` must run after every tsdown build** (wired into `build:js`). Rolldown lowers `export * as Tabs` into materialized getter objects, which break React Server Components (`<Tabs.Root>` renders undefined: "Element type is invalid … got: undefined").
- **Dev never builds or watches `dist/`** — storybook reads `src/` natively, and `.storybook/main.ts` aliases `@aussieljk/frosted` (and `/icons/*`) to `src/` so demo source can name the public package. Only the postcss watchers (`styles.css`, `theme.css`) run during dev. If you change the package's public entry points, check those aliases still cover them.
- **`sideEffects` in `packages/frosted-ui/package.json` must stay `["./dist/icons/adapters/*"]`**, not `false`. The icon adapter subpaths (`@aussieljk/frosted/icons/lucide` etc.) register themselves on import; `sideEffects: false` silently tree-shakes them.
- **TypeScript 7 (native compiler) is the repo default**, and it has no JS compiler API. `tools/props-gen` exists solely to scope a classic-TS pin (`typescript@6`) for prop-table generation, which needs the compiler API. Don't "clean up" that package or its nested `node_modules/typescript` — `doctor.ts` allowlists it deliberately.
- **`.stylelintrc.js` must stay `.js`** — stylelint's TS config loader calls classic-TS APIs that the TS7 native compiler doesn't export.
- **`src/styles/tokens/tailwind-color.css` is hand-maintained runtime CSS** (per-palette oklch seeds + `:where()` blocks computing all 12 steps via color-mix/relative color syntax). There is no generator anymore; edit it by hand. Tailwind palettes are prefixed `tw-` (`tw-indigo`) to coexist with the Radix scales.
- **Icon adapters in `src/icons/adapters/` are generated** — edit `scripts/icon-map.ts` and run `bun run generate:icon-adapters`; never edit the adapters directly.
- **`lucide-react` is v1.x** — the adapter uses v1 names (`House`, `Funnel`, `TriangleAlert`); pre-1.0 aliases like `Home` no longer exist despite the permissive peer range.
- **Docs demos live in the registry** (`packages/frosted-ui/.storybook/demos/index.ts`), consumed by both the `Examples` page and per-page `<Demo id>` blocks — add demos there, never inline them in MDX. Demos import from `@aussieljk/frosted` (aliased to `src/` in `.storybook/main.ts`) because their source is shown to users verbatim.
- **A component with an authored MDX docs page must set `tags: ['!autodocs']`** in its story meta. `.storybook/stories/components/<name>.mdx` attaches via `<Meta of={…Stories} />`; leaving autodocs on as well makes storybook fail on duplicate docs entries. Components without an MDX page keep `tags: ['autodocs']`.
- **Prop tables are generated, not written** — `bun run generate:props` extracts them from the TS types into `.storybook/generated/component-props.json`, which `<PropsTable component="Button" />` renders. The `<name>PropDefs` naming convention is what backfills defaults and descriptions. Storybook's own docgen is `react-docgen` (non-TS) and can't see any of this, which is why the generator exists.
- **`llms.txt` / `llms-full.txt` are generated from the MDX** by `bun run generate:llms` into `.storybook/public/` (served at the site root). It expands `<PropsTable>` and `<Demo>` into real markdown, so it regenerates whenever the prop tables do.
- **If something is mysteriously broken, run `bun run doctor`** — under the hoisted linker, stale nested `packages/*/node_modules` dirs from older installs can shadow the root binaries (a package silently using an ancient `tsc`). `doctor --fix` deletes them.
