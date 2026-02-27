import { useState } from 'react';
import type { Locale, ProjectsContent, UiLabels } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

interface ProjectsSectionProps {
  locale: Locale;
  projects: ProjectsContent;
  ui: UiLabels;
}

export function ProjectsSection({ locale, projects, ui }: ProjectsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(projects.items[0]?.id ?? null);

  return (
    <SectionWrapper id="projects" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(projects.title, locale)}</h2>
        <p>{t(projects.intro, locale)}</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {projects.items.map((project) => {
          const expanded = expandedId === project.id;

          return (
            <article key={project.id} className="project-card">
              <img
                src={project.images[0]}
                alt={`${t(project.title, locale)} visual`}
                className="h-44 w-full rounded-2xl border border-[var(--line)] object-cover"
                loading="lazy"
              />

              <h3 className="mt-4 font-display text-xl font-semibold text-[var(--title)]">{t(project.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">{t(project.summary, locale)}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((tech) => (
                  <span key={`${project.id}-${tech}`} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="secondary-pill mt-5"
                onClick={() => setExpandedId(expanded ? null : project.id)}
              >
                {expanded ? t(ui.projects.hide, locale) : t(ui.projects.details, locale)}
              </button>

              {expanded ? (
                <div className="mt-5 space-y-4 border-t border-[var(--line)] pt-4">
                  <p className="text-sm leading-relaxed text-[var(--text)]">{t(project.context, locale)}</p>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                      {t(ui.projects.highlights, locale)}
                    </p>
                    <ul className="space-y-2 text-sm text-[var(--text)]">
                      {project.highlights.map((point) => (
                        <li key={`${project.id}-${point.es}`} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                          <span>{t(point, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                      {t(ui.projects.stack, locale)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={`${project.id}-full-${tech}`} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.links.publicRepo ? (
                      <a
                        href={project.links.publicRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="secondary-pill !px-3 !py-2 !text-xs"
                      >
                        {t(ui.projects.publicRepo, locale)}
                      </a>
                    ) : null}

                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-pill !px-3 !py-2 !text-xs"
                      >
                        {t(ui.projects.demo, locale)}
                      </a>
                    ) : null}

                    {project.links.privateRepoLabel ? (
                      <span className="rounded-full border border-dashed border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--muted)]">
                        {project.links.privateRepoLabel}
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

