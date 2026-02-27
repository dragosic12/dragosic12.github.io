import type { ExperienceContent, Locale } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

interface ExperienceSectionProps {
  locale: Locale;
  experience: ExperienceContent;
}

export function ExperienceSection({ locale, experience }: ExperienceSectionProps) {
  return (
    <SectionWrapper id="experience" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(experience.title, locale)}</h2>
        <p>{t(experience.intro, locale)}</p>
      </div>

      <div className="mt-8 grid gap-5">
        {experience.items.map((item) => (
          <article key={item.id} className="glass-panel p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-[var(--title)]">{t(item.role, locale)}</h3>
              <span className="subtle-label">{t(item.period, locale)}</span>
            </div>

            <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{t(item.organization, locale)}</p>
            <p className="mt-3 leading-relaxed text-[var(--text)]">{t(item.summary, locale)}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <span key={`${item.id}-${tool}`} className="chip">
                  {tool}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
