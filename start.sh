#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [[ "${1:-}" != '' && "${1:-}" != '--check' ]]; then echo 'Usage: ./start.sh [--check]' >&2;exit 2;fi
if [[ ! -x .venv/bin/python ]]; then "${ANALYTICS_PYTHON:-python3.12}" -m venv .venv;fi
.venv/bin/python verify.py
if [[ "${1:-}" == '--check' ]]; then exit 0;fi
exec .venv/bin/python server.py
