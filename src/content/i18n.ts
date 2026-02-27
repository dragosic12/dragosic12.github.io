import type { Locale, LocalizedText } from '../types/content';

export function t(text: LocalizedText, locale: Locale): string {
  return locale === 'en' ? text.en : text.es;
}

