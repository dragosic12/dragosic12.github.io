import { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ImageLabSection } from '../components/ImageLabSection';
import { SkillsSection } from '../components/SkillsSection';
import { FocusSection } from '../components/FocusSection';
import { ContactSection } from '../components/ContactSection';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { portfolioContent } from '../content/portfolioContent';
import { t } from '../content/i18n';
import { useLocale } from '../hooks/useLocale';
import { useTheme } from '../hooks/useTheme';

export function App() {
  const { locale, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.title = t(portfolioContent.seo.title, locale);

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', t(portfolioContent.seo.description, locale));
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t(portfolioContent.seo.title, locale));
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t(portfolioContent.seo.description, locale));
    }
  }, [locale]);

  return (
    <div className="app-shell min-h-screen text-[var(--text)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-[var(--card)] focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <SiteHeader
        locale={locale}
        theme={theme}
        nav={portfolioContent.ui.nav}
        onToggleLocale={() => setLocale(locale === 'es' ? 'en' : 'es')}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        localeLabel={portfolioContent.ui.locale}
        themeLabel={theme === 'dark' ? t(portfolioContent.ui.theme.light, locale) : t(portfolioContent.ui.theme.dark, locale)}
      />

      <main id="main-content" className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
        <HeroSection locale={locale} profile={portfolioContent.profile} ui={portfolioContent.ui} cvUrl={portfolioContent.social.cv} />
        <AboutSection locale={locale} about={portfolioContent.about} />
        <ProjectsSection locale={locale} projects={portfolioContent.projects} ui={portfolioContent.ui} />
        <ImageLabSection locale={locale} imageLab={portfolioContent.imageLab} />
        <SkillsSection locale={locale} skills={portfolioContent.skills} />
        <FocusSection locale={locale} focus={portfolioContent.focus} />
        <ContactSection locale={locale} contact={portfolioContent.contact} social={portfolioContent.social} ui={portfolioContent.ui} />
      </main>

      <SiteFooter locale={locale} text={portfolioContent.ui.footer} />
    </div>
  );
}

