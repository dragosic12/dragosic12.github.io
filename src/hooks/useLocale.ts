import { useEffect, useState } from 'react';
import type { Locale } from '../types/content';

const STORAGE_KEY = 'dragos.locale';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' ? 'en' : 'es';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, setLocale };
}

