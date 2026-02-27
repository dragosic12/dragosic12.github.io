import type { Locale, NavigationItem, Theme } from '../types/content';
import { t } from '../content/i18n';

interface SiteHeaderProps {
  locale: Locale;
  theme: Theme;
  nav: NavigationItem[];
  onToggleLocale: () => void;
  onToggleTheme: () => void;
  localeLabel: { es: string; en: string };
  themeLabel: string;
}

export function SiteHeader({
  locale,
  theme,
  nav,
  onToggleLocale,
  onToggleTheme,
  localeLabel,
  themeLabel,
}: SiteHeaderProps) {
  const localeNext = locale === 'es' ? localeLabel.en : localeLabel.es;

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--header-bg)]/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 pb-2 pt-3 sm:px-6">
        <div className="header-shell flex flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4">
          <a href="#home" className="font-display text-xl font-semibold tracking-wide text-[var(--title)]">
          Dragos Camarasan
        </a>

          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
                className="rounded-full border border-[var(--line)] bg-[var(--card)]/70 px-3 py-1.5 text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--title)]"
            >
              {t(item.label, locale)}
            </a>
          ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="locale-toggle"
              onClick={onToggleLocale}
              className="rounded-full border border-[var(--line)] bg-[var(--card)]/75 px-3 py-1.5 text-xs text-[var(--text)] transition hover:border-[var(--accent)]"
              aria-label={locale === 'es' ? 'Switch language to English' : 'Cambiar idioma a español'}
            >
              {localeNext}
            </button>
            <button
              type="button"
              data-testid="theme-toggle"
              onClick={onToggleTheme}
              className="rounded-full border border-[var(--line)] bg-[var(--card)]/75 px-3 py-1.5 text-xs text-[var(--text)] transition hover:border-[var(--accent)]"
              aria-label={themeLabel}
              title={themeLabel}
            >
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

