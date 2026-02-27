import type { FocusContent, Locale } from '../types/content';
import { SectionWrapper } from './SectionWrapper';
import { t } from '../content/i18n';

interface FocusSectionProps {
  locale: Locale;
  focus: FocusContent;
}

export function FocusSection({ locale, focus }: FocusSectionProps) {
  return (
    <SectionWrapper id="focus" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(focus.title, locale)}</h2>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {focus.paragraphs.map((paragraph) => (
          <article key={paragraph.es} className="glass-panel p-5">
            <p className="leading-relaxed text-[var(--text)]">{t(paragraph, locale)}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

