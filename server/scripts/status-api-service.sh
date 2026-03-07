#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${1:-dragos-portfolio-api}"

echo "== systemctl status =="
sudo systemctl --no-pager status "${SERVICE_NAME}" || true

echo
echo "== ultimos logs =="
sudo journalctl -u "${SERVICE_NAME}" -n 120 --no-pager || true
