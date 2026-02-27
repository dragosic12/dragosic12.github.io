import type { Locale, LocalizedText } from '../types/content';
import { t } from '../content/i18n';

interface SiteFooterProps {
  locale: Locale;
  text: LocalizedText;
}

export function SiteFooter({ locale, text }: SiteFooterProps) {
  return (
    <footer className="mt-14 border-t border-[var(--line)] pb-10 pt-6">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 sm:px-6">
        <p className="text-xs text-[var(--muted)]">{t(text, locale)}</p>
        <a href="#home" className="text-xs uppercase tracking-[0.14em] text-[var(--accent)] transition hover:opacity-80">
          TOP
        </a>
      </div>
    </footer>
  );
}

