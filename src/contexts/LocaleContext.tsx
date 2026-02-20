'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import koMessages from '@/locales/ko.json';
import enMessages from '@/locales/en.json';
import jaMessages from '@/locales/ja.json';
import zhCNMessages from '@/locales/zh-CN.json';

export const locales = ['ko', 'en', 'ja', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
};

type Messages = typeof koMessages;

const messagesMap: Record<Locale, Messages> = {
  ko: koMessages,
  en: enMessages,
  ja: jaMessages,
  'zh-CN': zhCNMessages,
};

interface LocaleContextType {
  lang: Locale;
  setLang: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

const LOCALE_STORAGE_KEY = 'preferred-locale';
const DEFAULT_LOCALE: Locale = 'ko';

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLocale: Locale) => {
    setLangState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string>): string => {
    const messages = messagesMap[lang];
    const keys = key.split('.');
    let value: unknown = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey] ?? `{${paramKey}}`);
    }

    return value;
  }, [lang]);

  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
