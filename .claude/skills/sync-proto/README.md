# Proto Type Sync Skill

Automates keeping this client's hand-written TypeScript types in sync with the
public Decision API proto definitions in **moloco/rmp-infra**.

## Two pieces

| Piece | File | What it does |
| --- | --- | --- |
| **Skill** (the brain) | `SKILL.md` | `/sync-proto` — reads protos from GitHub, compares against every `src/v1/<endpoint>/`, edits types/utils, validates, opens a **draft PR**. Works locally (your `gh` auth) or in CI. |
| **Weekly automation** (the alarm clock) | `../../../.github/workflows/sync-proto-weekly.yml` | Runs the skill autonomously every Monday and opens the draft PR. |
| **Change-gate** | `../../../.github/scripts/proto-change-gate.sh` | Skips the run when the protos haven't moved since the last sync. |
| **State** | `../../../.sync-proto/last-synced.json` | Records the last-synced rmp-infra commit SHA. |

## How it reads rmp-infra (no local checkout)

The skill reads protos over the GitHub API:

```bash
gh api "repos/moloco/rmp-infra/contents/<path>?ref=main" --jq '.content' | base64 -d
```

- **Locally:** your existing `gh auth` (you have moloco access) just works.
- **In CI:** a GitHub App token (read scope on `moloco/rmp-infra`) is passed as
  `GH_TOKEN`. This is the cross-org bridge — `moloco/rmp-infra` lives in the
  `moloco` org while this repo is in `moloco-mcm`.

## Running locally

```
/sync-proto
```

The skill change-gates first, and if protos changed, updates types, runs
`yarn check-ts && yarn test && yarn build && yarn docs`, and opens a draft PR.

## Weekly automation (Bundle C — mirrors rmp-portal "fe-codeian")

`sync-proto-weekly.yml` runs on a **weekly cron** (Mon 14:00 UTC), on the moloco
**self-hosted runner** using **Vertex AI** for the model and a **cross-org
GitHub App** for repo access — the same stack rmp-portal's `claude-code.yml`
uses. A single job (this sync is small; no need for the multi-pod matrix the
Codebase Guardian uses for its large scans).

### Prerequisites (infra / org-admin provisioned)

These are **not** set up by this PR — they require the moloco infra team and
admins on both orgs:

1. **Self-hosted runner** — authorize `moloco-mcm/decision-api-client-js` on the
   `moloco-infra-cicd-4x` runner group.
2. **Vertex AI** — that runner must carry GCP creds for project `moloco-rmp-dev`
   (region `us-east5`), with the Claude model in the workflow **enabled on
   Vertex**. Confirm the model id (`claude-opus-4-6` in the workflow) is
   available there before trusting the cron — fe-codeian had to pin an exact id
   when a model wasn't yet on Vertex.
3. **GitHub App** `APP_ID_MCM_CLAUDE_CODE` installed on **both**
   `moloco/rmp-infra` (Contents: read) and `moloco-mcm/decision-api-client-js`
   (Contents + Pull requests: write). Add:
   - `vars.APP_ID_MCM_CLAUDE_CODE`
   - `secrets.APP_PRIVATE_KEY_MCM_CLAUDE_CODE`
4. **Slack** — `secrets.SLACK_WEBHOOK_URL` for completion/failure notifications.

### Rollout

1. Land this PR (skill + workflow + gate). The **skill is usable immediately**
   from your laptop regardless of the infra above.
2. Once infra provisions 1–4, validate via the **`workflow_dispatch`** button
   once before relying on the Monday cron (fe-codeian's own rollout pattern).
3. The cron then runs unattended; you review/merge the draft PRs it opens.

## Design notes (borrowed from fe-codeian's hard-won lessons)

- **Change-gate** avoids noise PRs on quiet weeks (analogous to the Guardian's
  per-package coverage cache).
- **Pinned action SHAs** — `claude-code-action`, `create-github-app-token`, and
  `checkout` are pinned (version drift bit rmp-portal).
- **Truncated gate output** (`| tail -n`) keeps command noise out of the agent's
  context.
- **`notify-failure` on `ubuntu-latest`** so failures are reported even if the
  self-hosted runner pod dies (an in-job `if: always()` doesn't survive that).
- **Draft PR only, never auto-merge**; stale prior `sync-proto` PRs are
  auto-closed before opening a new one.

## Endpoint coverage

The skill discovers endpoints dynamically from `src/v1/*/` (currently 8:
product-, brand-, display-, reserved-display-, creative-, creative-bulk-auction,
plus deprecated auction and recommendation). See the reference map in
`SKILL.md`. New endpoints are picked up automatically.
