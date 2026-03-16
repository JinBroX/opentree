import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import zh from './zh';
import en from './en';
import type { Translations } from './zh';

export type Lang = 'zh' | 'en';

const translations: Record<Lang, Translations> = { zh, en };

interface LangContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'zh',
  t: zh,
  setLang: () => {},
  toggle: () => {},
});

// Simple IP-based region detection (uses free ipapi.co)
async function detectLang(): Promise<Lang> {
  try {
    const stored = localStorage.getItem('opentree-lang') as Lang | null;
    if (stored === 'zh' || stored === 'en') return stored;

    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    // Chinese-speaking regions: CN, TW, HK, MO, SG
    const chineseRegions = ['CN', 'TW', 'HK', 'MO', 'SG'];
    return chineseRegions.includes(data.country_code) ? 'zh' : 'en';
  } catch {
    return 'zh'; // fallback
  }
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    detectLang().then((detected) => {
      setLangState(detected);
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('opentree-lang', l);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  }, [lang, setLang]);

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
