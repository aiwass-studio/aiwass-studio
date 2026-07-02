import { useState, useEffect } from 'react';
import { translations } from './translations';

export const useTranslation = () => {
  const [lang, setLang] = useState((window as any).__language || 'en');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLang((window as any).__language || 'en');
    };
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  const t = (key: string) => {
    const currentLang = (window as any).__language || lang || 'en';
    const langTrans = translations[currentLang as 'es' | 'en' | 'it'] || translations['en'];
    if ((langTrans as any)[key]) {
      return (langTrans as any)[key];
    }
    const heroTranslations = langTrans.hero || translations['en'].hero;
    return (heroTranslations as any)[key] || key;
  };

  return { t };
};
