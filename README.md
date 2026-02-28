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

- `npm run dev`: entorno local
- `npm run dev:api`: backend local (proxy CORS hacia Hugging Face)
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

## Despliegue

El deploy está automatizado a GitHub Pages en cada push a `main` mediante `.github/workflows/deploy.yml`.

## Generador IA (proxy local)

- El frontend no llama a Hugging Face directamente.
- La imagen se genera vía `POST /api/generate-image` en `server/index.js`.
- El token se guarda en backend (`HF_API_KEY`) y nunca se expone en cliente.

### Puesta en marcha local (paso a paso)

1. Copia variables de entorno:
   - PowerShell: `Copy-Item .env.example .env`
2. Edita `.env` y añade tu token en `HF_API_KEY`.
3. Terminal 1: arranca API local:
   - `npm run dev:api`
4. Terminal 2: arranca frontend:
   - `npm run dev`
5. Abre `http://localhost:5173` y prueba la sección `Generador de imágenes`.

Si el backend no está disponible, la UI muestra una vista local de fallback para no romper la experiencia.

## Seguridad

- No uses variables `VITE_*` para claves privadas.
- Evita publicar claves en repositorios públicos.
- Escaneo de secretos con Gitleaks en CI.
- Si necesitas claves para otros proyectos, usa `.env` fuera de repositorio y rota cualquier token expuesto previamente.

