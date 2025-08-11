import { useState, useEffect, useMemo, useCallback } from 'react';
import { translations, Language, TranslationKey } from '../i18n';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('clinic_language');
    return (stored as Language) || 'en';
  });

  // Memoize the translation function to prevent recreating it on every render
  const t = useCallback((key: TranslationKey): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  }, [currentLanguage]);

  // Memoize the changeLanguage function
  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('clinic_language', language);
    
    // Update document direction for RTL languages
    if (language === 'ar') {
      document.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, []);

  // Memoize the isRTL value
  const isRTL = useMemo(() => currentLanguage === 'ar', [currentLanguage]);

  useEffect(() => {
    // Set initial direction and language only once
    if (currentLanguage === 'ar') {
      document.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [currentLanguage]);

  return useMemo(() => ({
    currentLanguage,
    changeLanguage,
    t,
    isRTL
  }), [currentLanguage, changeLanguage, t, isRTL]);
};
