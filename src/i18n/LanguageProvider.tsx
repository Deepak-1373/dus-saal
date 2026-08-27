import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from './lang';
import { STRINGS, type StringKey } from './strings';

const DEVANAGARI_HREF =
  'https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@400;700;800&display=swap';
const DEVANAGARI_ID = 'devanagari-font';

interface LanguageValue {
  lang: Lang;
  toggle: () => void;
  t: (key: StringKey) => string;
}

const LanguageContext = createContext<LanguageValue | null>(null);

// Devanagari is fetched only once Hindi is chosen, so English visitors never pay for it.
function loadDevanagari() {
  if (document.getElementById(DEVANAGARI_ID)) return;

  const link = document.createElement('link');
  link.id = DEVANAGARI_ID;
  link.rel = 'stylesheet';
  link.href = DEVANAGARI_HREF;
  document.head.appendChild(link);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'hi') loadDevanagari();
  }, [lang]);

  const toggle = useCallback(() => setLang((current) => (current === 'en' ? 'hi' : 'en')), []);
  const t = useCallback((key: StringKey) => STRINGS[lang][key], [lang]);
  const value = useMemo(() => ({ lang, toggle, t }), [lang, toggle, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside a LanguageProvider');
  return value;
}
