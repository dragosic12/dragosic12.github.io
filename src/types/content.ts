export type Locale = 'es' | 'en';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email: string;
  cv: string;
}

export interface ProjectLinkSet {
  publicRepo?: string;
  privateRepoLabel?: string;
  demo?: string;
}

export interface ProjectEntry {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  context: LocalizedText;
  stack: string[];
  highlights: LocalizedText[];
  images: string[];
  links: ProjectLinkSet;
}

export interface SkillGroup {
  name: LocalizedText;
  items: string[];
}

export interface SeoContent {
  title: LocalizedText;
  description: LocalizedText;
}

export interface NavigationItem {
  id: string;
  label: LocalizedText;
}

export interface ProfileContent {
  name: string;
  role: LocalizedText;
  location: LocalizedText;
  headline: LocalizedText;
  subheadline: LocalizedText;
  shortBio: LocalizedText;
  photo: string;
  insightLines: LocalizedText[];
}

export interface AboutContent {
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

export interface ExperienceEntry {
  id: string;
  role: LocalizedText;
  organization: LocalizedText;
  period: LocalizedText;
  summary: LocalizedText;
  tools: string[];
}

export interface ExperienceContent {
  title: LocalizedText;
  intro: LocalizedText;
  items: ExperienceEntry[];
}

export interface ProjectsContent {
  title: LocalizedText;
  intro: LocalizedText;
  items: ProjectEntry[];
}

export interface SkillsContent {
  title: LocalizedText;
  groups: SkillGroup[];
}

export interface FocusContent {
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

export interface ImageStyleOption {
  value: string;
  label: LocalizedText;
}

export interface ImageLabContent {
  title: LocalizedText;
  intro: LocalizedText;
  tokenLabel: LocalizedText;
  tokenHint: LocalizedText;
  rememberTokenLabel: LocalizedText;
  showTokenLabel: LocalizedText;
  hideTokenLabel: LocalizedText;
  promptLabel: LocalizedText;
  promptPlaceholder: LocalizedText;
  styleLabel: LocalizedText;
  generateLabel: LocalizedText;
  generatingLabel: LocalizedText;
  clearLabel: LocalizedText;
  downloadLabel: LocalizedText;
  note: LocalizedText;
  previewTitle: LocalizedText;
  emptyPreviewText: LocalizedText;
  missingTokenError: LocalizedText;
  missingPromptError: LocalizedText;
  apiErrorPrefix: LocalizedText;
  styleOptions: ImageStyleOption[];
  quickPrompts: LocalizedText[];
}

export interface ContactContent {
  title: LocalizedText;
  text: LocalizedText;
  emailLabel: LocalizedText;
  cvLabel: LocalizedText;
}

export interface UiLabels {
  nav: NavigationItem[];
  locale: {
    es: string;
    en: string;
  };
  theme: {
    light: LocalizedText;
    dark: LocalizedText;
  };
  projects: {
    details: LocalizedText;
    hide: LocalizedText;
    highlights: LocalizedText;
    stack: LocalizedText;
    publicRepo: LocalizedText;
    demo: LocalizedText;
  };
  social: {
    github: LocalizedText;
    linkedin: LocalizedText;
    email: LocalizedText;
  };
  ctas: {
    viewProjects: LocalizedText;
    downloadCv: LocalizedText;
  };
  footer: LocalizedText;
}

export interface PortfolioContent {
  seo: SeoContent;
  profile: ProfileContent;
  about: AboutContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  imageLab: ImageLabContent;
  skills: SkillsContent;
  focus: FocusContent;
  contact: ContactContent;
  social: SocialLinks;
  ui: UiLabels;
}

export type Theme = 'dark' | 'light';

