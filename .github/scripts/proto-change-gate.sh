#!/usr/bin/env bash
#
# proto-change-gate.sh
#
# Compares the latest moloco/rmp-infra commit that touched the decision proto
# directory against the SHA recorded in .sync-proto/last-synced.json.
#
# Purpose: keep the weekly sync quiet. If the protos have not moved since the
# last successful sync, there is nothing to do and we skip the (paid) agent run
# and avoid opening a no-op PR.
#
# Outputs (when $GITHUB_OUTPUT is set, i.e. in CI):
#   changed=true|false      whether the upstream proto SHA differs from last-synced
#   upstream_sha=<sha>       latest rmp-infra commit touching the proto path
#   last_sha=<sha|empty>     SHA recorded in .sync-proto/last-synced.json
#
# Requires: gh (authenticated), jq.
# Auth: in CI, set GH_TOKEN to a token that can read moloco/rmp-infra.
#       Locally, your existing `gh auth` is used.
set -euo pipefail

REPO="${RMP_INFRA_REPO:-moloco/rmp-infra}"
REF="${RMP_INFRA_REF:-main}"
PROTO_PATH="${PROTO_PATH:-protocol/api/adcloud/rmp/decision/v1/public}"
STATE_FILE="${STATE_FILE:-.sync-proto/last-synced.json}"

upstream_sha="$(gh api "repos/${REPO}/commits?path=${PROTO_PATH}&sha=${REF}&per_page=1" --jq '.[0].sha' 2>/dev/null || true)"
if [ -z "${upstream_sha}" ] || [ "${upstream_sha}" = "null" ]; then
  echo "ERROR: could not resolve upstream proto SHA for ${REPO}/${PROTO_PATH} (auth/network?)." >&2
  exit 1
fi

last_sha=""
if [ -f "${STATE_FILE}" ]; then
  last_sha="$(jq -r '.rmp_infra_sha // ""' "${STATE_FILE}")"
fi

changed="true"
if [ "${upstream_sha}" = "${last_sha}" ]; then
  changed="false"
fi

echo "upstream proto SHA : ${upstream_sha}"
echo "last-synced SHA    : ${last_sha:-<none>}"
echo "changed            : ${changed}"
if [ "${changed}" = "true" ] && [ -n "${last_sha}" ]; then
  echo "upstream diff      : https://github.com/${REPO}/compare/${last_sha}...${upstream_sha}"
fi

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  {
    echo "changed=${changed}"
    echo "upstream_sha=${upstream_sha}"
    echo "last_sha=${last_sha}"
  } >> "${GITHUB_OUTPUT}"
fi
