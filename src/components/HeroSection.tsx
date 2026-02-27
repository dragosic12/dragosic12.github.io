import type { Locale, ProfileContent, UiLabels } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

interface HeroSectionProps {
  locale: Locale;
  profile: ProfileContent;
  ui: UiLabels;
  cvUrl: string;
}

export function HeroSection({ locale, profile, ui, cvUrl }: HeroSectionProps) {
  const insights = profile.terminalLines.map((line) =>
    line.replace(/^\$\s*/, '').replace(/\s+#\s*/, ': ').replace(/_/g, ' ').trim()
  );

  return (
    <SectionWrapper id="home" className="pt-10 sm:pt-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            {profile.role[locale]} · {profile.location[locale]}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-[var(--title)] sm:text-5xl md:text-6xl">
            {profile.headline[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] sm:text-base">{profile.subheadline[locale]}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text)] sm:text-lg">{profile.shortBio[locale]}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="primary-pill"
            >
              {t(ui.ctas.viewProjects, locale)}
            </a>
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="secondary-pill"
            >
              {t(ui.ctas.downloadCv, locale)}
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="glass-panel p-5 sm:p-6">
            <p className="subtle-label">Resumen profesional</p>
            <ol className="mt-3 grid gap-2 text-sm text-[var(--text)]" aria-label="Technical profile summary">
              {insights.map((insight) => (
                <li key={insight} className="rounded-xl border border-[var(--line)] bg-[var(--bg-soft)]/60 px-3 py-2">
                  {insight}
                </li>
              ))}
            </ol>
          </div>

          <div className="glass-panel flex items-center gap-4 p-4">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-24 w-24 rounded-2xl border border-[var(--line)] object-cover shadow-glow"
              loading="eager"
            />
            <div>
              <p className="font-display text-lg font-semibold text-[var(--title)]">{profile.name}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{profile.role[locale]}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

