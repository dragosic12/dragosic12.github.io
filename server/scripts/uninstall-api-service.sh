#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${1:-dragos-portfolio-api}"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

sudo systemctl stop "${SERVICE_NAME}" 2>/dev/null || true
sudo systemctl disable "${SERVICE_NAME}" 2>/dev/null || true
sudo rm -f "${SERVICE_FILE}"
sudo systemctl daemon-reload
sudo systemctl reset-failed

echo "[api-service] Servicio eliminado: ${SERVICE_NAME}"
echo "[api-service] El archivo /etc/${SERVICE_NAME}.env no se borra por seguridad."
