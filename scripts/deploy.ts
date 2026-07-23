#!/usr/bin/env bun
/**
 * Deploy the cosmos site to Vercel.
 *
 *   bun scripts/deploy.ts            preview deploy
 *   bun scripts/deploy.ts --prod     production deploy
 *
 * In CI the target is inferred instead: a push to master is production, a pull
 * request is a preview whose URL gets commented on the PR. The build runs here
 * on the runner (`vercel build` → `bun run build:cosmos`, per vercel.json) and
 * only the output is uploaded, so a Blacksmith box does the work rather than
 * Vercel's builder.
 *
 * Needs VERCEL_TOKEN / VERCEL_ORG_ID / VERCEL_PROJECT_ID in CI; locally it uses
 * the .vercel link and your `vercel login` session. A pull request from a fork
 * has no secrets, so the deploy is skipped with a warning rather than failing.
 */
import { ROOT, fail, run, capture, step, summary } from './lib.ts';

const flags = process.argv.slice(2);
const token = process.env.VERCEL_TOKEN;
const event = process.env.GITHUB_EVENT_NAME;

const production = flags.includes('--prod') || (!flags.includes('--preview') && event === 'push');

if (process.env.CI && !token) {
  if (production) fail('VERCEL_TOKEN is not set — add it under Settings → Secrets and variables → Actions');
  console.warn('⚠ no VERCEL_TOKEN (fork PR?) — skipping the preview deploy');
  process.exit(0);
}

/** `vercel <args>` with the token appended when we have one. */
const vercel = (...args: string[]) => ['bun', 'x', 'vercel', ...args, ...(token ? ['--token', token] : [])];

step(`${production ? 'Production' : 'Preview'} deploy`);
run(vercel('pull', '--yes', `--environment=${production ? 'production' : 'preview'}`));
run(vercel('build', ...(production ? ['--prod'] : [])));

// `vercel deploy` prints the deployment URL on stdout and its progress on stderr.
const out = capture(vercel('deploy', '--prebuilt', ...(production ? ['--prod'] : [])));
const url = out.split('\n').filter(Boolean).at(-1) ?? fail('vercel printed no deployment URL');

console.log(`\n✓ deployed to ${url}`);
summary(`### ▲ ${production ? 'Production' : 'Preview'} deploy\n\n${url}`);

// One rolling comment per PR rather than one per push.
const pr = process.env.GITHUB_REF?.match(/^refs\/pull\/(\d+)\//)?.[1];
if (pr && !production) {
  const body = `▲ **Preview deploy** for \`${process.env.GITHUB_SHA?.slice(0, 7)}\`: ${url}`;
  const comment = (...args: string[]) =>
    Bun.spawnSync(['gh', 'pr', 'comment', pr, '--body', body, ...args], { cwd: ROOT, env: process.env }).exitCode === 0;
  if (!comment('--edit-last', '--create-if-none') && !comment()) {
    console.warn('⚠ could not comment the preview URL on the PR');
  }
}
