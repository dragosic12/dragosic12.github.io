import type { FocusContent, Locale } from '../types/content';
import { SectionWrapper } from './SectionWrapper';
import { t } from '../content/i18n';

interface FocusSectionProps {
  locale: Locale;
  focus: FocusContent;
}

export function FocusSection({ locale, focus }: FocusSectionProps) {
  const focusText = focus.paragraphs.map((paragraph) => t(paragraph, locale)).join(' ');

  return (
    <SectionWrapper id="focus" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(focus.title, locale)}</h2>
      </div>

      <article className="glass-panel mt-6 p-6 sm:p-7">
        <p className="leading-relaxed text-[var(--text)] sm:text-lg">{focusText}</p>
      </article>
    </SectionWrapper>
  );
}

