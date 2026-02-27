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

## Generador IA

- El generador está integrado dentro del portfolio y no requiere introducir token en la interfaz.
- Usa un endpoint público de generación de imágenes en cliente para evitar gestión de credenciales en la web.

## Seguridad

- Evita publicar claves en repositorios públicos si cambias la configuración del generador.
- Escaneo de secretos con Gitleaks en CI.
- Si necesitas claves para otros proyectos, usa `.env` fuera de repositorio y rota cualquier token expuesto previamente.

