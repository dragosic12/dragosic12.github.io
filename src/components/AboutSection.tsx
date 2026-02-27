import type { AboutContent, Locale } from '../types/content';
import { SectionWrapper } from './SectionWrapper';
import { t } from '../content/i18n';

interface AboutSectionProps {
  locale: Locale;
  about: AboutContent;
}

export function AboutSection({ locale, about }: AboutSectionProps) {
  return (
    <SectionWrapper id="about" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(about.title, locale)}</h2>
      </div>
      <div className="mt-6 grid gap-4">
        {about.paragraphs.map((paragraph) => (
          <article key={paragraph.es} className="glass-panel p-5 sm:p-6">
            <p className="leading-relaxed text-[var(--text)]">{t(paragraph, locale)}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

