import type { Locale, SkillsContent } from '../types/content';
import { SectionWrapper } from './SectionWrapper';
import { t } from '../content/i18n';

interface SkillsSectionProps {
  locale: Locale;
  skills: SkillsContent;
}

export function SkillsSection({ locale, skills }: SkillsSectionProps) {
  return (
    <SectionWrapper id="skills" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(skills.title, locale)}</h2>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group) => (
          <article key={group.name.es} className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{t(group.name, locale)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={`${group.name.es}-${item}`} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

