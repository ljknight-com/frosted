#!/usr/bin/env bun
// Full production release: publish @aussieljk/frosted to npm, then deploy the
// cosmos site to vercel. Sequential — any failing step aborts the rest.
//
//   1. refuse to run with uncommitted changes (including untracked files)
//   2. bump 0.0.1-N → 0.0.1-N+1 and publish (the package's `release` script;
//      prepublishOnly runs check-version + lint + build)
//   3. commit the version bump and push
//   4. vercel --prod
//
// Usage: bun run prod

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PKG = join(ROOT, 'packages/frosted-ui');

function run(cmd: string[], cwd = ROOT) {
  console.log(`\n$ ${cmd.join(' ')}`);
  const { exitCode } = Bun.spawnSync(cmd, { cwd, stdout: 'inherit', stderr: 'inherit' });
  if (exitCode !== 0) {
    console.error(`✗ ${cmd.join(' ')} failed (exit ${exitCode})`);
    process.exit(exitCode ?? 1);
  }
}

const dirty = Bun.spawnSync(['git', 'status', '--porcelain'], { cwd: ROOT }).stdout.toString().trim();
if (dirty) {
  console.error('✗ uncommitted changes — commit or stash first:\n' + dirty);
  process.exit(1);
}

run(['bun', 'run', 'release'], PKG);

const version = JSON.parse(readFileSync(join(PKG, 'package.json'), 'utf8')).version;
run(['git', 'commit', '-am', `chore: release ${version}`]);
run(['git', 'push']);

run(['vercel', '--prod']);

console.log(`\n✓ ${version} published to npm and deployed to vercel`);
