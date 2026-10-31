"""Copia al escaparate lo que vive en otras carpetas del PC.

Uso: python tools/sincronizar.py [tpv] [reels]   (sin argumentos, todo)

- tpv:   web de venta de D:\\Dragos\\TPVVideo\\web -> tpv-global/ (con las rutas
         adaptadas para GitHub Pages) y los vídeos de D:\\Dragos\\TPVVideo\\movil.
- reels: vídeos con música y portadas de D:\\Dragos\\LagattaPanfleto\\public\\reels
         -> reels-la-gatta/videos, y reels.json con títulos y canciones sacados
         de LagattaPanfleto/src/Reels.tsx.

Después: revisar con `python -m http.server` y subir (ver README).
"""
import json
import re
import shutil
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
TPV_WEB = Path(r"D:\Dragos\TPVVideo\web")
TPV_VIDEOS = Path(r"D:\Dragos\TPVVideo\movil")
REELS_DIR = Path(r"D:\Dragos\LagattaPanfleto\public\reels")
REELS_TSX = Path(r"D:\Dragos\LagattaPanfleto\src\Reels.tsx")


def copiar_si_cambia(src: Path, dst: Path) -> bool:
    if dst.exists() and dst.stat().st_size == src.stat().st_size and dst.stat().st_mtime >= src.stat().st_mtime:
        return False
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    return True


def reemplazar(html: str, viejo: str, nuevo: str) -> str:
    if viejo not in html:
        raise SystemExit(f"No encuentro en la web del TPV el trozo a cambiar:\n  {viejo[:120]}\n"
                         "La web original ha cambiado: actualiza este script.")
    return html.replace(viejo, nuevo)


def tpv():
    dst = RAIZ / "tpv-global"
    html = (TPV_WEB / "index.html").read_text(encoding="utf-8")

    # En el servidor la web cuelga de /tpv-global/web/ y la app está en /tpv-global/.
    # Aquí la web ES /tpv-global/, así que fuentes y vídeos pasan a estar al lado.
    html = reemplazar(html, '<link rel="stylesheet" href="../fonts.css">',
                      '<link rel="icon" href="favicon.png" type="image/png">\n<link rel="stylesheet" href="fonts.css">')
    html = html.replace('"../videos/', '"videos/')

    # La demo en vivo necesita el backend del TPV. Si DEMO_URL está vacío se
    # enseñan capturas del estilo elegido; si apunta a un TPV publicado, se carga en el móvil.
    html = reemplazar(html, "const CONTACT = { email: '', phone: '' }",
                      "const CONTACT = { email: '', phone: '' }\n\n"
                      "// Dirección de un TPV Global en marcha (p. ej. por Tailscale Funnel). Vacío = solo capturas.\n"
                      "const DEMO_URL = ''")
    html = reemplazar(html,
                      '<a class="btn btn-g" href="../" target="_blank" rel="noopener" style="min-height:44px">',
                      '<a class="btn btn-g" id="demoFull" href="#" target="_blank" rel="noopener" style="min-height:44px">')
    html = reemplazar(html,
                      '<iframe id="live" title="Demo de TPV Global" loading="lazy" src="about:blank"></iframe>',
                      '<iframe id="live" title="Demo de TPV Global" loading="lazy" src="about:blank"></iframe>'
                      '<img id="liveShot" alt="TPV Global: plano de mesas" hidden style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">')
    html = reemplazar(html, "  if (demo) { try { const w = $('#live').contentWindow; w && w.__tpvTema && w.__tpvTema(current.id) } catch {} }",
                      "  if (!DEMO_URL) { const s = $('#liveShot'); if (s) s.src = `img/mesas_${current.id}.webp` }\n"
                      "  else if (demo) { try { const w = $('#live').contentWindow; w && w.__tpvTema && w.__tpvTema(current.id) } catch { liveLoad() } }")
    viejo_live = ("const live = $('#live')\n"
                  "new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { const dk = document.documentElement.getAttribute('data-theme') ? document.documentElement.getAttribute('data-theme') === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches\n"
                  "    live.src = `../?selector=0&tema=${current.id}&modo=${dk ? 'dark' : 'light'}`; o.disconnect() } }, { rootMargin: '600px' }).observe(live)")
    nuevo_live = (
        "const live = $('#live')\n"
        "const pageDark = () => document.documentElement.getAttribute('data-theme') ? document.documentElement.getAttribute('data-theme') === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches\n"
        "const demoSrc = (modo) => `${DEMO_URL}?selector=0&tema=${current.id}&modo=${modo || (pageDark() ? 'dark' : 'light')}`\n"
        "// Desde otro dominio no se puede llamar a __tpvTema dentro del iframe: se recarga con el estilo en la URL.\n"
        "function liveLoad(modo) { if (DEMO_URL) live.src = demoSrc(modo) }\n"
        "if (DEMO_URL) {\n"
        "  $('#demoFull').href = DEMO_URL\n"
        "  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { liveLoad(); o.disconnect() } }, { rootMargin: '600px' }).observe(live)\n"
        "} else {\n"
        "  live.remove(); $('#liveShot').hidden = false; $('#liveShot').src = `img/mesas_${current.id}.webp`\n"
        "  $('.live .phone').style.aspectRatio = '9 / 16'  // las capturas son 540x960\n"
        "  document.querySelectorAll('#demoLight, #demoDark, #demoFull, .pins').forEach(el => el.remove())\n"
        "  $('#demo .lead').textContent = 'Elige un estilo y mira cómo queda el plano de mesas. La demo para tocarla, con PIN y pedidos de verdad, la enseño en persona.'\n"
        "  $('.live-note').textContent = 'Capturas del TPV con datos de ejemplo.'\n"
        "  const k = $('#demo .kicker'); if (k) k.textContent = 'Los 8 estilos'\n"
        "}")
    html = reemplazar(html, viejo_live, nuevo_live)
    html = reemplazar(html,
                      "function demoMode(m) { try { const w = $('#live').contentWindow; w && w.__tpvModo && w.__tpvModo(m) } catch {} }",
                      "function demoMode(m) { if (!DEMO_URL) return; try { const w = $('#live').contentWindow; w && w.__tpvModo && w.__tpvModo(m) } catch { liveLoad(m) } }")
    # Vuelta al escaparate desde el pie.
    html = reemplazar(html,
                      '<footer><div class="wrap"><span>TPV Global · TPV para hostelería</span>',
                      '<footer><div class="wrap"><span>TPV Global · TPV para hostelería · <a href="../" style="color:inherit">Más proyectos</a></span>')

    (dst / "index.html").write_text(html, encoding="utf-8")
    n = sum(copiar_si_cambia(f, dst / "img" / f.name) for f in (TPV_WEB / "img").iterdir() if f.is_file())
    v = sum(copiar_si_cambia(f, dst / "videos" / f.name) for f in TPV_VIDEOS.glob("*.mp4"))
    print(f"tpv: web actualizada, {n} imágenes y {v} vídeos copiados")


def reels():
    dst = RAIZ / "reels-la-gatta"
    tsx = REELS_TSX.read_text(encoding="utf-8")
    canciones = dict(re.findall(r"'([\w-]+)':\s*'([^']+)'", tsx.split("export const REELS")[0]))
    lista = []
    for m in re.finditer(r"f:\s*'([\w-]+)'(.*?)\n  \}", tsx.split("export const REELS")[1], re.S):
        f, cuerpo = m.group(1), m.group(2)
        titulo = re.search(r"titulo:\s*'([^']+)'", cuerpo)
        cuando = re.search(r"cuando:\s*'([^']+)'", cuerpo)
        video, portada = REELS_DIR / f"{f}-musica.mp4", REELS_DIR / f"{f}-portada.jpg"
        if not video.exists():
            video = REELS_DIR / f"{f}.mp4"
        if not video.exists() or not portada.exists():
            print(f"reels: falta el vídeo o la portada de {f}, lo salto")
            continue
        copiar_si_cambia(video, dst / "videos" / f"{f}.mp4")
        copiar_si_cambia(portada, dst / "videos" / f"{f}.jpg")
        lista.append({
            "id": f,
            "titulo": titulo.group(1) if titulo else f,
            "cuando": cuando.group(1).split(" (")[0] if cuando else "",
            "cancion": canciones.get(f, ""),
            "mb": round(video.stat().st_size / 1048576, 1),
        })
    (dst / "reels.json").write_text(json.dumps(lista, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"reels: {len(lista)} reels en reels.json")


if __name__ == "__main__":
    que = sys.argv[1:] or ["tpv", "reels"]
    if "tpv" in que:
        tpv()
    if "reels" in que:
        reels()
