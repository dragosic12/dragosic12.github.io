# Dragos Camarasan - Portfolio Técnico

Portfolio one-page bilingüe (ES/EN) orientado a empresas y reclutadores, con estética técnica tipo terminal moderno.

Incluye una sección integrada `Generador de imágenes` dentro del propio portfolio.

## Stack

- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- Vitest + Testing Library
- Playwright (smoke e2e)
- GitHub Actions (CI + deploy + secret scan)

## Scripts

- `npm run dev`: entorno local completo (frontend + backend proxy)
- `npm run dev:web`: solo frontend
- `npm run dev:api`: solo backend local (proxy CORS hacia Hugging Face)
- `npm run build`: typecheck + build de producción
- `npm run preview`: previsualizar build
- `npm run lint`: lint de TypeScript
- `npm run typecheck`: comprobación de tipos
- `npm run test`: tests unitarios
- `npm run test:e2e`: smoke e2e con Playwright

## Estructura

- `src/app`: composición principal
- `src/components`: secciones UI
- `src/content`: contenido bilingüe tipado
- `src/hooks`: `useTheme`, `useLocale`, `useInView`
- `src/types`: contratos de datos
- `src/styles`: estilos globales + tema
- `public/assets`: CV, foto y assets visuales
- `.github/workflows`: CI/CD y seguridad

## Documentacion de cambios

- Guia detallada: `docs/GUIA_MANTENIMIENTO.md`

## Despliegue

El deploy está automatizado a GitHub Pages en cada push a `main` mediante `.github/workflows/deploy.yml`.

## Generador IA

- Modo recomendado: usar backend propio vía `POST /api/generate-image` en `server/index.js`.
- El token se guarda en backend (`HF_API_KEY`) y nunca se expone en cliente.
- Hay fallback visual para mantener la UX si el proveedor falla.

### Puesta en marcha local (paso a paso)

1. Copia variables de entorno:
   - PowerShell: `Copy-Item .env.example .env`
2. Añade `HF_API_KEY` en `.env`.
3. Arranca todo con un único comando:
   - `npm run dev`
4. Abre `http://localhost:5173` y prueba la sección `Generador de imágenes`.
5. Opcional:
   - Solo frontend: `npm run dev:web`
   - Solo backend: `npm run dev:api`

Si algún proveedor falla, la UI usa fallback para no romper la experiencia.

### Produccion (GitHub Pages + API en servidor propio)

1. Despliega el backend `server/index.js` en tu servidor.
2. Guarda `HF_API_KEY` como variable del sistema en el servidor, no en el frontend.
3. En GitHub, define `Settings > Secrets and variables > Actions > Variables`:
   - `VITE_API_BASE_URL=https://TU_DOMINIO_O_IP_API`
4. Haz push a `main`; el workflow inyecta esa URL al build estático.

## Seguridad

- No uses variables `VITE_*` para claves privadas.
- Evita publicar claves en repositorios públicos.
- Escaneo de secretos con Gitleaks en CI.
- Si necesitas claves para otros proyectos, usa `.env` fuera de repositorio y rota cualquier token expuesto previamente.

