#!/usr/bin/env bash

set -Eeuo pipefail

readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

: "${VERCEL_TOKEN:?VERCEL_TOKEN must be set}"
: "${VERCEL_ORG_ID:?VERCEL_ORG_ID must be set}"
: "${VERCEL_PROJECT_ID:?VERCEL_PROJECT_ID must be set}"

command -v node >/dev/null 2>&1 || {
  echo "Node.js is required to deploy this project." >&2
  exit 1
}

command -v npm >/dev/null 2>&1 || {
  echo "npm is required to deploy this project." >&2
  exit 1
}

echo "Installing project dependencies..."
npm ci

run_vercel() {
  if command -v vercel >/dev/null 2>&1; then
    vercel "$@"
  else
    npx --yes vercel@latest "$@"
  fi
}

echo "Pulling Vercel production settings..."
run_vercel pull --yes --environment=production --token="${VERCEL_TOKEN}"

echo "Building production artifacts..."
run_vercel build --prod --token="${VERCEL_TOKEN}"

echo "Deploying production artifacts..."
run_vercel deploy --prebuilt --prod --token="${VERCEL_TOKEN}"
