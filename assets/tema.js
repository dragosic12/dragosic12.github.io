// Modo claro/oscuro compartido por todas las páginas del escaparate.
// Se carga en <head> para que no haya destello; el botón #themeBtn (si existe) lo alterna.
(function () {
  const KEY = 'escaparate.tema'
  const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
  const save = v => { try { localStorage.setItem(KEY, v) } catch {} }
  const isDark = () => (read() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark'
  function apply() {
    const dark = isDark()
    document.documentElement.classList.toggle('dark', dark)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = dark ? '#161412' : '#f9f9f9'
    const icon = document.getElementById('themeIcon')
    if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode'
  }
  apply()
  document.addEventListener('DOMContentLoaded', () => {
    apply()
    const btn = document.getElementById('themeBtn')
    if (btn) btn.addEventListener('click', () => { save(isDark() ? 'light' : 'dark'); apply() })
  })
})()
