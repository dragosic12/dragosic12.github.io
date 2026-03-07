# Guia de mantenimiento del portfolio

Esta guia resume donde tocar cada parte de la web cuando quieras cambiar contenido o comportamiento.

## 1) Contenido principal (texto y datos)

Archivo clave:
- `src/content/portfolioContent.ts`

En este fichero editas:
- Perfil (`profile`)
- Sobre mi (`about`)
- Experiencia (`experience`)
- Proyectos (`projects.items`)
- Skills (`skills`)
- Enfoque profesional (`focus`)
- Contacto (`contact`)

Todos los textos son bilingues:
- `es` para espanol
- `en` para ingles

## 2) Anadir o quitar proyectos

Archivo:
- `src/content/portfolioContent.ts`

Ruta:
- `projects.items`

### Quitar un proyecto
1. Busca su bloque por `id`.
2. Elimina ese objeto del array.

### Anadir un proyecto
1. Duplica un objeto existente dentro de `projects.items`.
2. Cambia:
- `id` (unico)
- `title.es` / `title.en`
- `summary`, `context`, `stack`, `highlights`
- `images` (ruta del asset)
- `links` (`publicRepo` o `demo` si aplica)

## 3) Imagenes/SVG de proyectos

Carpeta:
- `public/assets/projects`

Uso:
- En `projects.items[].images` pones la ruta (por ejemplo `'/assets/projects/pwa.svg'`).
- Si existe variante `-dark.svg`, la card la usa en modo claro cuando corresponde.

Nota:
- Puedes quitar un proyecto sin borrar sus SVG.

## 4) Secciones y UI

Componentes principales:
- `src/components/ProjectsSection.tsx`
- `src/components/ImageLabSection.tsx`
- `src/components/ExperienceSection.tsx`
- `src/components/SkillsSection.tsx`
- `src/components/HeroSection.tsx`

Composicion de pagina:
- `src/app/App.tsx`

Si quieres ocultar una seccion entera:
1. Ve a `src/app/App.tsx`.
2. Quita el componente de esa seccion.

## 5) Generador de imagenes

Componente:
- `src/components/ImageLabSection.tsx`

Rutas/proveedores que usa:
- Backend proxy propio: `VITE_API_BASE_URL` -> `POST /api/generate-image`
- Fallback de vista local si todo falla

Si quieres cambiar tiempos o estrategia:
- Timeouts y constantes al inicio de `ImageLabSection.tsx`.

## 6) Variables de entorno

Ejemplo:
- `.env.example`

Local real (no subir):
- `.env`

Variables utiles:
- `HF_API_KEY` para backend (`npm run dev:api` o servidor)
- `HF_MODEL` para cambiar modelo de inferencia
- `API_PORT` para puerto API
- `CORS_ORIGINS` para permitir dominios concretos
- `VITE_API_BASE_URL` para que frontend apunte a tu API publica en produccion

Nota de seguridad:
- `HF_API_KEY` nunca debe ir en `VITE_*` ni en codigo cliente.
- En servidor, guardalo en un fichero de entorno del servicio (`EnvironmentFile`) o variable del sistema.

## 7) Comandos de desarrollo

- `npm run dev` -> frontend + backend local
- `npm run dev:web` -> solo frontend
- `npm run dev:api` -> solo backend
- `npm run lint`
- `npm run build`
- `npm run test:e2e`

## 8) Despliegue

Repositorio:
- rama `main`

Workflow:
- `.github/workflows/deploy.yml`

Cada push a `main` dispara deploy a GitHub Pages.
El build toma `VITE_API_BASE_URL` desde `GitHub Actions Variables`.
Para la API en servidor:
- `docs/API_GENERADOR_SERVIDOR.md`
- `server/scripts/install-api-service.sh`

## 9) Checklist rapido antes de publicar cambios

1. `npm run lint`
2. `npm run build`
3. (Opcional) `npm run test:e2e`
4. Commit + push a `main`
