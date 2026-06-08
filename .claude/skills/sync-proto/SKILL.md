---
name: sync-proto
description: Sync TypeScript types with moloco/rmp-infra decision proto definitions (reads protos from GitHub, opens a draft PR)
version: 2.0.0
---

# Proto Type Sync Skill

Keep this client's hand-written TypeScript types in sync with the public Decision
API proto definitions owned by **moloco/rmp-infra**. Reads the protos directly
from GitHub (no local rmp-infra checkout required), compares against every
endpoint under `src/v1/`, updates types/utils, validates, and opens a **draft PR**.

## Syntax

```
/sync-proto
```

## Source of truth

- Repo: `moloco/rmp-infra` (private — requires GitHub auth that can read it)
- Branch: `main`
- Proto base path: `protocol/api/adcloud/rmp/decision/v1/public`
  - `api/service.proto` — RPC definitions
  - `messages/messages.proto` — request/response messages
- Shared entities: `protocol/api/adcloud/rmp/decision/v1/entities/decision.proto`

Read protos with `gh api` (works locally via your `gh auth`; in CI via the
`GH_TOKEN` provided by the workflow's GitHub App token):

```bash
gh api "repos/moloco/rmp-infra/contents/<path>?ref=main" --jq '.content' | base64 -d
```

## Instructions for Claude

**IMPORTANT:** Execute each step as a SEPARATE tool call. This skill may run
non-interactively in CI — do NOT ask the user questions; make the safe choice
(when a change is ambiguous or behavior-affecting, leave it out and note it in
the PR body as "needs human review").

### Step 1: Change-gate (skip if protos unchanged)

```bash
bash .github/scripts/proto-change-gate.sh
```

If it reports `changed: false`, the protos have not moved since the last sync —
**stop here** and report "no changes; types already in sync." Otherwise continue
and remember the `upstream proto SHA` it prints (you will record it in Step 7).

### Step 2: Read the proto files

```bash
gh api "repos/moloco/rmp-infra/contents/protocol/api/adcloud/rmp/decision/v1/public/api/service.proto?ref=main" --jq '.content' | base64 -d > /tmp/service.proto
gh api "repos/moloco/rmp-infra/contents/protocol/api/adcloud/rmp/decision/v1/public/messages/messages.proto?ref=main" --jq '.content' | base64 -d > /tmp/messages.proto
gh api "repos/moloco/rmp-infra/contents/protocol/api/adcloud/rmp/decision/v1/entities/decision.proto?ref=main" --jq '.content' | base64 -d > /tmp/decision.proto
```

Read all three.

### Step 3: Discover endpoints dynamically

Do NOT assume a fixed list. Enumerate the endpoint directories:

```bash
ls -d src/v1/*/ | sed 's|src/v1/||;s|/||' | grep -vE '^(types|utils|__tests__)$'
```

Each endpoint dir contains `types.ts`, `utils.ts`, and `<endpoint>.ts`. Shared
types live in `src/v1/types/{common,external,internal}.ts`.

### Step 4: Compare proto ↔ TypeScript per endpoint

Use the reference map below to find each endpoint's RPC and request/response
messages in the protos. For a directory not in the map, find its RPC in
`service.proto` (the endpoint's HTTP path in `<endpoint>.ts` mirrors the RPC).

For each endpoint, compare the proto messages with the `*Params`,
`*HttpRequestBody`, `*HttpResponseBody`, and `*Data` types in `types.ts`, and the
two converters in `utils.ts`. Identify: new fields, removed fields, type changes,
deprecations.

### Step 5: Update the TypeScript

For each difference:
- Edit `src/v1/<endpoint>/types.ts` (request + response types, and the HTTP-body
  twins).
- Edit `src/v1/<endpoint>/utils.ts` converters
  (`translate*ParamsTo*HttpRequestBody`, `translate*HttpResponseBodyTo*Data`).
- Edit shared `src/v1/types/external.ts` / `common.ts` when a shared type changes.

Rules:
- Preserve optional markers (`?`). Request fields are generally optional; response
  fields generally required — match the proto's `optional`/repeated semantics and
  the surrounding code's style.
- Field naming: proto `snake_case` → TypeScript `camelCase` (generic rule). Only
  special cases need attention; most fields convert mechanically.
- Keep `HttpRequestBody`/`HttpResponseBody` (snake_case-on-the-wire) in sync with
  their camelCase counterparts.
- Do not change business logic or rename existing public types. When unsure, skip
  and flag for human review.

### Step 6: Validate (deterministic gates — truncate output)

```bash
yarn check-ts 2>&1 | tail -30
yarn test 2>&1 | tail -30
yarn build 2>&1 | tail -20
yarn docs 2>&1 | tail -20
```

If any gate fails, fix and re-run. If a failure can't be resolved safely, revert
that change and record it in the PR body under "needs human review."

### Step 7: Record the synced SHA

Update `.sync-proto/last-synced.json`: set `rmp_infra_sha` to the upstream SHA
from Step 1 and `synced_at` to today's date (UTC). Commit this file with the
type changes so the next run's change-gate is accurate.

### Step 8: Open a draft PR (or report)

If `git status` shows no changes after Step 5, report "types already in sync"
and stop (still record the SHA in Step 7 so the gate updates).

Otherwise:
1. Close any stale open PRs from a previous run to avoid pile-up:
   ```bash
   gh pr list --label sync-proto --state open --json number --jq '.[].number' \
     | xargs -r -n1 gh pr close
   ```
2. Create a dated branch, commit (do NOT `git add .`; stage only the files you
   changed plus `.sync-proto/last-synced.json`), push, and open a **draft** PR:
   ```bash
   BR="sync-proto/$(date -u +%Y-%m-%d)"
   git checkout -b "$BR"
   git add <changed files> .sync-proto/last-synced.json
   git commit -m "Sync types with rmp-infra proto definitions"
   git push -u origin "$BR"
   gh pr create --draft --label sync-proto \
     --title "[sync-proto] Update types from rmp-infra" \
     --body "<see PR body below>"
   ```

PR body must include:
- The upstream diff link (`rmp-infra/compare/<last_sha>...<upstream_sha>`).
- Per-endpoint summary of what changed (added/removed/changed fields).
- Gate results (check-ts / test / build / docs all green).
- A "needs human review" section for anything skipped.

## Endpoint reference map

| `src/v1/` dir | RPC (service.proto) | Request / Response messages |
| --- | --- | --- |
| `product-auction` | `DecideAdProducts` | `DecisionProductsRequest` / `DecisionProductsResponse` |
| `brand-auction` | `DecideAdBrands` | `DecisionBrandsRequest` / `DecisionBrandsResponse` |
| `display-auction` | `DecideAdDisplay` | `DecisionDisplayRequest` / `DecisionDisplayResponse` |
| `reserved-display-auction` | `DecideAdReservedDisplay` | `DecisionReservedDisplayRequest` / `DecisionReservedDisplayResponse` |
| `creative-auction` | `DecideAdCreative` | `DecisionCreativeRequest` / `DecisionCreativeResponse` |
| `creative-auction-bulk` | `DecideAdCreativesBulk` | `DecisionCreativeBulkRequest` / `DecisionCreativeBulkResponse` |
| `auction` (deprecated) | `DecideAdItems` | `DecisionRequest` / `DecisionResponse` |
| `recommendation` (deprecated) | `DecideRecommendedItems` | `DecisionRequest` / `DecisionRecommendationResponse` |

Note: `auction` and `recommendation` are deprecated in this client (they emit
runtime deprecation warnings). Keep them in sync only if their protos change;
prefer not to expand their surface.

## Notes

- This skill is read-only against rmp-infra; it never writes there.
- The deterministic gates are the safety net — a draft PR is only opened when
  `check-ts`, `test`, `build`, and `docs` all pass.
- Reviewers approve/merge; the bot never merges.
