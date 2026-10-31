# Proyectos de Dragos

Escaparate público en **https://dragosic12.github.io/**: un menú (estilo TPV, claro y oscuro) con las cosas que voy haciendo, cada una en su ruta:

- `/tpv-global/`: web de TPV Global con capturas de los 8 estilos y vídeos.
- `/reels-la-gatta/`: galería de reels de La Gatta.
- `/swapcar/`: vídeos de SwapCar y las animaciones de match (`/swapcar/match/`). La tarjeta "SwapCar" del menú lleva a la app en producción (swapcar.app).

La portada lleva un bloque "Sobre mí" (en `index.html`) con los CV de `assets/cv/`: se generan con el generador de CV del servidor pero SIN teléfono ni DNI (no publicar nunca los PDF normales). Las capturas de las webs de terceros están en `assets/capturas/`.

Todo es estático (HTML, CSS, JS, imágenes y vídeos): GitHub Pages no ejecuta servidores ni bases de datos. Solo datos de ejemplo, nada real de nadie.

El portfolio anterior (React) está guardado en la rama `portfolio-antiguo`.

## Añadir un proyecto

1. Crear la carpeta `<nombre>/` con su `index.html` (puede usar `../assets/estilo.css` y `../assets/tema.js` para tener el mismo aspecto y el modo oscuro; `reels-la-gatta/index.html` sirve de ejemplo).
2. Añadir su tarjeta a `catalog.json`:
   ```json
   {
     "id": "mi-juego",
     "nombre": "Mi juego",
     "desc": "Una frase de qué es.",
     "icono": "sports_esports",
     "categoria": "juegos",
     "url": "mi-juego/",
     "imagen": "mi-juego/portada.webp",
     "estado": "demo",
     "etiquetas": ["JavaScript"],
     "fecha": "2026-11-01"
   }
   ```
   - `icono`: nombre de [Material Symbols](https://fonts.google.com/icons).
   - `categoria`: `proyectos`, `webs`, `videos` o `juegos` (se pueden añadir más en `categorias`).
   - `estado`: `live` (en producción), `demo` (se puede probar), `web`, `videos` o `pronto` (sin `url`).
   - `url` puede ser externa (`https://...`): se abre en otra pestaña con el botón "Visitar".
   - La lista se ordena por `fecha`, lo más nuevo primero.
3. Subir los cambios (ver abajo). Para un proyecto con build (Vite, Angular...), compilar con la base `/<nombre>/` y copiar el resultado a la carpeta.

Límites de GitHub: 100 MB por archivo y unos 1 GB en total. Para vídeos, mejor versiones comprimidas para móvil.

## Actualizar TPV Global, los reels y SwapCar

Viven en otras carpetas del PC (`D:\Dragos\TPVVideo`, `D:\Dragos\LagattaPanfleto`, `D:\Dragos\SwapCarVideo`). Para traer lo último:

```
python tools/sincronizar.py          # todo
python tools/sincronizar.py reels    # solo los reels (también: tpv, swapcar)
```

La web del TPV se adapta sola (rutas y demo). Si `DEMO_URL` (al principio del script de `tpv-global/index.html`, lo pone `sincronizar.py`) apunta a un TPV Global publicado, el móvil de la sección "Pruébalo" carga la demo en vivo; vacío, enseña capturas.

## Probar en local y publicar

```
python -m http.server 8080      # y abrir http://localhost:8080/
git add -A && git commit -m "..." && git push
```

Cada push a `main` publica la web con GitHub Actions (`.github/workflows/deploy.yml`), en un minuto o dos.
