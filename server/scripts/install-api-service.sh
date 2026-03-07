#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${1:-dragos-portfolio-api}"
APP_DIR="${2:-$HOME/apps/dragosic12.github.io}"
RUN_USER="${3:-$USER}"
PORT="${4:-8787}"
ENV_FILE="/etc/${SERVICE_NAME}.env"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

if ! command -v node >/dev/null 2>&1; then
  echo "[api-service] Node.js no encontrado."
  exit 1
fi

if [[ ! -f "${APP_DIR}/server/index.js" ]]; then
  echo "[api-service] No existe ${APP_DIR}/server/index.js"
  exit 1
fi

if [[ ! -f "${APP_DIR}/package.json" ]]; then
  echo "[api-service] No existe ${APP_DIR}/package.json"
  exit 1
fi

if [[ ! -d "${APP_DIR}/node_modules" ]]; then
  echo "[api-service] Dependencias no instaladas. Ejecuta npm install en ${APP_DIR}"
  exit 1
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "[api-service] Creando ${ENV_FILE} (editalo con HF_API_KEY real)..."
  sudo tee "${ENV_FILE}" >/dev/null <<EOF
HF_API_KEY=replace_me
HF_MODEL=stabilityai/stable-diffusion-xl-base-1.0
API_PORT=${PORT}
CORS_ORIGINS=https://dragosic12.github.io,http://localhost:5173,http://127.0.0.1:5173
EOF
  sudo chmod 600 "${ENV_FILE}"
fi

NODE_BIN="$(command -v node)"

sudo tee "${SERVICE_FILE}" >/dev/null <<EOF
[Unit]
Description=Dragos Portfolio Image API
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${RUN_USER}
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
EnvironmentFile=${ENV_FILE}
ExecStart=${NODE_BIN} ${APP_DIR}/server/index.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable "${SERVICE_NAME}"
sudo systemctl restart "${SERVICE_NAME}"

echo "[api-service] Servicio instalado: ${SERVICE_NAME}"
sudo systemctl --no-pager status "${SERVICE_NAME}" | sed -n '1,25p'
