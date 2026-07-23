/**
 * The repo's CI/CD, in TypeScript. `bun run workflows` renders this file to
 * `.github/workflows/*.yml`; never edit the YAML by hand (CI checks it matches).
 *
 * Two workflows:
 *
 *   ci.yml       every PR and every push to master — one `check` job (format,
 *                lint, typecheck, build, package health, cosmos export, this
 *                file's YAML being in sync), then a Vercel deploy: a preview
 *                URL commented on the PR, production on master.
 *
 *   release.yml  manual button (Actions → Release → Run workflow). Bumps
 *                0.0.1-N → N+1, publishes to npm, pushes the version commit and
 *                deploys production. The CI-side equivalent of `bun run prod`.
 *
 * Both run on Blacksmith runners, which are a drop-in `runs-on` swap: the cache
 * actions and everything else stay stock.
 *
 * Secrets (Settings → Secrets and variables → Actions):
 *   NPM_TOKEN         npm granular automation token with publish rights on
 *                     @aussieljk/frosted (automation tokens bypass 2FA/OTP)
 *   VERCEL_TOKEN      vercel.com/account/tokens
 *   VERCEL_ORG_ID     `orgId` from .vercel/project.json (gitignored)
 *   VERCEL_PROJECT_ID `projectId` from .vercel/project.json
 */
import { cacheBunStore, cacheTurbo, checkout, install, setupBun, sh, type Runner, type Workflow } from './dsl.ts';
import root from '../package.json' with { type: 'json' };

/** 4 vCPU is the sweet spot here: turbo fans lint/typecheck/build out across cores. */
const RUNNER: Runner = 'blacksmith-4vcpu-ubuntu-2404';

/** Same bun the lockfile and this laptop use, straight off `packageManager`. */
const BUN_VERSION = root.packageManager.replace('bun@', '');

const MASTER = 'master';
const ON_MASTER = `github.ref == 'refs/heads/${MASTER}'`;

const VERCEL_ENV = {
  VERCEL_TOKEN: '${{ secrets.VERCEL_TOKEN }}',
  VERCEL_ORG_ID: '${{ secrets.VERCEL_ORG_ID }}',
  VERCEL_PROJECT_ID: '${{ secrets.VERCEL_PROJECT_ID }}',
};

const ci: Workflow = {
  name: 'CI',
  on: {
    push: { branches: [MASTER] },
    pull_request: { branches: [MASTER] },
  },
  // One run per branch; a new push cancels the one in flight.
  concurrency: { group: 'ci-${{ github.ref }}', 'cancel-in-progress': true },
  permissions: { contents: 'read' },
  jobs: {
    check: {
      name: 'Check',
      'runs-on': RUNNER,
      'timeout-minutes': 20,
      steps: [
        checkout(),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        cacheTurbo(),
        // Cheap and pure-text first, so a formatting nit fails in seconds.
        sh('Workflows in sync', 'bun run workflows:check'),
        sh('Format', 'bun run format:check'),
        sh('Lint', 'bun run lint'),
        sh('Typecheck', 'bun run typecheck'),
        sh('Build', 'bun run build'),
        sh('Package health', 'bun run --filter=@aussieljk/frosted health'),
        sh('Cosmos export', 'bun run build:cosmos'),
      ],
    },
    deploy: {
      name: 'Deploy',
      needs: 'check',
      'runs-on': RUNNER,
      'timeout-minutes': 20,
      // Commenting the preview URL on the PR.
      permissions: { contents: 'read', 'pull-requests': 'write' },
      steps: [
        checkout(),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        // deploy.ts picks production vs preview from the event itself, and
        // no-ops with a warning on PRs from forks, where the secrets are absent.
        sh('Vercel', 'bun scripts/deploy.ts', {
          env: { ...VERCEL_ENV, GITHUB_TOKEN: '${{ github.token }}' },
        }),
      ],
    },
  },
};

const release: Workflow = {
  name: 'Release',
  on: {
    workflow_dispatch: {
      inputs: {
        deploy: {
          description: 'Also deploy the cosmos site to production',
          type: 'boolean',
          default: true,
        },
      },
    },
  },
  // Never overlap releases, and never cancel one mid-publish.
  concurrency: { group: 'release', 'cancel-in-progress': false },
  // Pushing the version-bump commit back to master.
  permissions: { contents: 'write' },
  jobs: {
    release: {
      name: 'Publish + deploy',
      'runs-on': RUNNER,
      'timeout-minutes': 30,
      if: ON_MASTER,
      steps: [
        checkout(),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        cacheTurbo(),
        // Full gate before anything leaves the machine. npm publish re-runs
        // lint + build through prepublishOnly; that's cheap against turbo cache.
        sh('Check', 'bun run check'),
        sh('Publish to npm', 'bun scripts/release.ts', {
          env: { NPM_TOKEN: '${{ secrets.NPM_TOKEN }}' },
        }),
        sh('Deploy to Vercel', 'bun scripts/deploy.ts --prod', {
          if: '${{ inputs.deploy }}',
          env: VERCEL_ENV,
        }),
      ],
    },
  },
};

/** Filename → workflow. The generator treats this map as the whole of `.github/workflows`. */
export const workflows: Record<string, Workflow> = {
  'ci.yml': ci,
  'release.yml': release,
};
