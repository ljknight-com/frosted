# Frosted UI playground (`tailwind`)

A Vite app that exercises `@aussieljk/frosted` with Tailwind CSS v4. Two pages:

- `/` — a dashboard-style layout (`src/dashboard/page.tsx`)
- `/main.html` — a marketing-style page (`src/main/page.tsx`)

## Development

```bash
bun run dev
```

The dev script runs through [portless](https://www.npmjs.com/package/portless), so the app is served at
<https://play.frosted.localhost> (no port numbers). The header on every page links to the docs site,
Storybook, and GitHub.
