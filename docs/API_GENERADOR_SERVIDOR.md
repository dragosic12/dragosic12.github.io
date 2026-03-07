# API del generador en servidor propio

Objetivo: mantener `HF_API_KEY` solo en servidor y que GitHub Pages use esa API.

## 1) Desplegar codigo en tu servidor

En el servidor, en una ruta fija (ejemplo):

```bash
mkdir -p ~/apps
cd ~/apps
git clone https://github.com/dragosic12/dragosic12.github.io.git
cd dragosic12.github.io
npm ci
```

## 2) Instalar servicio systemd de la API

```bash
cd ~/apps/dragosic12.github.io
bash server/scripts/install-api-service.sh
```

Esto crea:
- Servicio: `dragos-portfolio-api`
- Fichero de secretos: `/etc/dragos-portfolio-api.env`

## 3) Guardar token Hugging Face en servidor

Edita el fichero de entorno:

```bash
sudo nano /etc/dragos-portfolio-api.env
```

Ajusta al menos:
- `HF_API_KEY=hf_xxx...`
- `CORS_ORIGINS=https://dragosic12.github.io`

Reinicia:

```bash
sudo systemctl restart dragos-portfolio-api
```

## 4) Comprobar estado

```bash
bash server/scripts/status-api-service.sh
curl http://127.0.0.1:8787/api/health
```

## 5) Apuntar frontend de GitHub Pages a la API

En GitHub:
- `Settings > Secrets and variables > Actions > Variables`
- Crear variable:
  - `VITE_API_BASE_URL=https://TU_IP_O_DOMINIO:8787`

Cada `push` a `main` recompila con esa URL.

## 6) Recomendaciones de seguridad

- No abras el puerto 8787 a todo Internet; idealmente limita por reverse proxy o firewall.
- Si dejas puerto publico, define CORS estricto en `CORS_ORIGINS`.
- No pongas `HF_API_KEY` en `.env` del frontend ni en `VITE_*`.
