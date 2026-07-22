/**
 * Dev orchestrator — `bun dev [--no-open] [--kill]`.
 *
 * Starts the dev processes in parallel, prefixes their output with short colored
 * labels, polls the portless URL, and opens it in Safari as it becomes ready.
 *
 * - Storybook reads frosted straight from src/, so no dist/ watch build runs here
 *   at all; only the CSS watchers, which produce the styles.css storybook imports.
 * - `generate:props` (the docs prop tables) is skipped when frosted src is unchanged
 *   since the last run, and refreshes in the background otherwise.
 * - Stale dev processes from a previous session (they squat the portless routes)
 *   are killed on startup; `--kill` does only that and exits.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dir, '..');
const frostedDir = join(root, 'packages/frosted-ui');
const propsGenDir = join(root, 'tools/props-gen');

const flags = process.argv.slice(2).filter((a) => a.startsWith('--'));
const noOpen = flags.includes('--no-open');
const killOnly = flags.includes('--kill');
const startedAt = Date.now();

const c = {
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
};

const elapsed = () => `${((Date.now() - startedAt) / 1000).toFixed(1)}s`;

// Lines nobody needs to see (banners, route chatter, telemetry notices).
// oxlint-disable-next-line no-control-regex
const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');
const NOISE = [
  /^\s*$/,
  /^portless$/, // portless prints its own banner…
  /^-- /, // …plus proxy/route status lines…
  /^-> |^Running: /, // …and the resolved command with its port mapping
  /^\s*[╭│╰┌└]/, // storybook banner box
  /telemetry/i,
];

interface Proc {
  name: string;
  paint: (s: string) => string;
  cwd: string;
  cmd: string[];
}

const allProcs: Record<string, Proc[]> = {
  sb: [
    {
      name: 'sb',
      paint: c.yellow,
      cwd: frostedDir,
      cmd: ['portless', 'frosted', 'sh', '-c', 'storybook dev -p "$PORT" --no-open --quiet'],
    },
  ],
  css: [
    {
      name: 'css',
      paint: c.green,
      cwd: frostedDir,
      cmd: ['postcss', 'src/styles/index.css', '-o', 'styles.css', '--watch'],
    },
    {
      name: 'thm',
      paint: c.blue,
      cwd: frostedDir,
      cmd: ['postcss', 'src/styles/theme.css', '-o', 'theme.css', '--watch'],
    },
  ],
};

const servers = [{ name: 'storybook', url: 'https://frosted.localhost' }];
const procs = [...allProcs.sb, ...allProcs.css];

// --- stale sessions ---

// A previous dev session left running (or orphaned) squats the portless routes and
// the proxy then serves the old code — kill anything of ours before starting.
function killStale(): number {
  const ps = Bun.spawnSync(['ps', '-eo', 'pid=,command=']).stdout.toString();
  const mine = new Set([process.pid, process.ppid]);
  let killed = 0;
  for (const line of ps.split('\n')) {
    const match = line.match(/^\s*(\d+)\s+(.*)/);
    if (!match) continue;
    const [, pid, command] = match;
    if (mine.has(Number(pid))) continue;
    if (!command.includes(`${root}/node_modules/.bin/`)) continue; // never touches the global proxy
    if (!/\.bin\/(portless|vite|storybook|tsdown|postcss|concurrently)/.test(command)) continue;
    try {
      process.kill(Number(pid), 'SIGTERM');
      killed++;
    } catch {}
  }
  return killed;
}

// --- process management ---

const children: ChildProcess[] = [];
let shuttingDown = false;

function shutdown(code: number) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.pid) {
      try {
        process.kill(-child.pid, 'SIGTERM');
      } catch {}
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

function start({ name, paint, cwd, cmd }: Proc) {
  const label = paint(name.padEnd(4)) + c.dim('│') + ' ';
  const child = spawn(cmd[0], cmd.slice(1), {
    cwd,
    detached: true, // own process group, so shutdown() can kill grandchildren (vite under portless)
    env: {
      ...process.env,
      FORCE_COLOR: '1',
      SB_DISABLE_TELEMETRY: '1',
      PATH: `${join(cwd, 'node_modules/.bin')}:${join(root, 'node_modules/.bin')}:${process.env.PATH}`,
    },
  });
  for (const stream of [child.stdout!, child.stderr!]) {
    createInterface({ input: stream }).on('line', (line) => {
      const plain = stripAnsi(line).trim();
      if (NOISE.some((re) => re.test(plain))) return;
      console.log(label + line);
    });
  }
  child.on('exit', (code) => {
    if (shuttingDown) return;
    console.log(c.red(`✗ ${name} exited unexpectedly (${code}) — shutting down`));
    shutdown(code ?? 1);
  });
  children.push(child);
}

async function waitAndOpen({ name, url }: { name: string; url: string }) {
  while (!shuttingDown) {
    try {
      const res = await fetch(url, { tls: { rejectUnauthorized: false } } as RequestInit);
      if (res.status < 400) break; // portless answers 404 for unregistered routes, 5xx while the backend boots
    } catch {}
    await Bun.sleep(250);
  }
  if (shuttingDown) return;
  console.log(`${c.green('✓')} ${c.bold(name.padEnd(9))} ${url}  ${c.dim(elapsed())}`);
  if (!noOpen) spawn('open', ['-a', 'Safari', url]);
}

// --- prop tables ---

// Fingerprint of everything generate-props reads; when unchanged, skip the ~7s
// regeneration entirely. Count catches deletions, max-mtime catches edits.
function propsFingerprint(): string {
  let maxMtime = statSync(join(propsGenDir, 'generate-props.ts')).mtimeMs;
  let count = 0;
  for (const entry of readdirSync(join(frostedDir, 'src'), { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    count++;
    const mtime = statSync(join(entry.parentPath, entry.name)).mtimeMs;
    if (mtime > maxMtime) maxMtime = mtime;
  }
  return `${count}:${maxMtime}`;
}

async function refreshProps() {
  const json = join(frostedDir, '.storybook/generated/component-props.json');
  const stampFile = join(frostedDir, '.storybook/generated/.props-stamp');
  const stamp = propsFingerprint();
  const fresh = existsSync(json) && existsSync(stampFile) && readFileSync(stampFile, 'utf8') === stamp;
  if (fresh) return;

  const run = (cmd: string[], cwd: string) =>
    new Promise<number>((done) => {
      spawn(cmd[0], cmd.slice(1), { cwd, stdio: 'ignore' }).on('exit', (code) => done(code ?? 1));
    });

  const generate = async () => {
    if ((await run(['bun', 'generate-props.ts'], propsGenDir)) !== 0) return;
    // llms.txt inlines the prop tables, so it regenerates with them.
    await run(['bun', 'scripts/generate-llms.ts'], frostedDir);
    writeFileSync(stampFile, stamp);
    if (!shuttingDown) console.log(`${c.green('✓')} ${c.bold('props')}     refreshed  ${c.dim(elapsed())}`);
  };

  // Storybook imports the JSON, so it can't boot without it; otherwise refresh behind vite.
  if (!existsSync(json)) {
    console.log(c.dim('generating prop tables…'));
    await generate();
  } else {
    generate();
  }
}

// --- go ---

const stale = killStale();
if (killOnly) {
  console.log(stale ? `killed ${stale} stale dev process${stale === 1 ? '' : 'es'}` : 'no stale dev processes');
  process.exit(0);
}

console.log(`\n${c.bold('❄ frosted dev')}\n`);
if (stale) console.log(c.dim(`killed ${stale} stale dev process${stale === 1 ? '' : 'es'} from a previous session`));

// Storybook imports the built styles.css/theme.css; the watchers recreate them, but
// on a pristine checkout build once up-front so the very first request can't 404.
if (!existsSync(join(frostedDir, 'styles.css')) || !existsSync(join(frostedDir, 'theme.css'))) {
  console.log(c.dim('first run — building css…'));
  const build = Bun.spawnSync(['bun', 'run', 'build:css'], {
    cwd: frostedDir,
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  if (build.exitCode !== 0) process.exit(build.exitCode);
}

await refreshProps();

procs.forEach(start);
Promise.all(servers.map(waitAndOpen)).then(() => {
  if (!shuttingDown) console.log(c.dim(`\nall ready in ${elapsed()} — ctrl-c to stop\n`));
});
