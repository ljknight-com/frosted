#!/usr/bin/env bun
/**
 * Publish @aussieljk/frosted to npm and push the version bump.
 *
 *   bun scripts/release.ts
 *
 * Runs identically on this laptop (via `bun run prod`) and in the Release
 * workflow; the only CI-specific bits are the npm token and the git identity.
 *
 *   1. refuse to run with uncommitted changes
 *   2. in CI, write ~/.npmrc from NPM_TOKEN (npm publish has no token flag)
 *   3. bump 0.0.1-N → 0.0.1-N+1 and publish (the package's `release` script;
 *      prepublishOnly runs check-version + lint + build)
 *   4. refresh bun.lock — it records the workspace version, so skipping this
 *      leaves the next `bun install --frozen-lockfile` failing in CI
 *   5. commit package.json + bun.lock and push
 *
 * The push uses GITHUB_TOKEN, whose pushes deliberately do not trigger further
 * workflow runs — so the release commit does not kick off a second CI + deploy.
 */
import { appendFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { CI, PKG, capture, fail, requireCleanTree, run, step, summary, version } from './lib.ts';

step('Checking the working tree');
requireCleanTree();

if (CI) {
  const token = process.env.NPM_TOKEN;
  if (!token) fail('NPM_TOKEN is not set — add it under Settings → Secrets and variables → Actions');
  appendFileSync(join(homedir(), '.npmrc'), `\n//registry.npmjs.org/:_authToken=${token}\n`);

  run(['git', 'config', 'user.name', 'github-actions[bot]']);
  run(['git', 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
}

step(`Publishing (from ${version()})`);
run(['bun', 'run', 'release'], { cwd: PKG });

const released = version();

step(`Committing ${released}`);
run(['bun', 'install', '--lockfile-only']);
run(['git', 'commit', '-am', `chore: release ${released}`]);

// HEAD:<branch> so this works from CI's checkout as well as a local branch.
const branch = process.env.GITHUB_REF_NAME ?? capture(['git', 'rev-parse', '--abbrev-ref', 'HEAD']);
run(['git', 'push', 'origin', `HEAD:${branch}`]);

summary(
  `### 📦 Published \`@aussieljk/frosted@${released}\`\n\nhttps://www.npmjs.com/package/@aussieljk/frosted/v/${released}`,
);
console.log(`\n✓ published @aussieljk/frosted@${released}`);
