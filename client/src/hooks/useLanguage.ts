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
    console.log('Changing language to:', language);
    setCurrentLanguage(language);
    localStorage.setItem('clinic_language', language);
    
    // Update document direction for RTL languages
    if (language === 'ar') {
      document.dir = 'rtl';
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.remove('ltr');
      document.body.classList.add('rtl');
      // Add data attribute for styling
      document.documentElement.setAttribute('data-dir', 'rtl');
    } else {
      document.dir = 'ltr';
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.remove('rtl');
      document.body.classList.add('ltr');
      // Add data attribute for styling
      document.documentElement.setAttribute('data-dir', 'ltr');
    }
    
    // Force a re-render by triggering a window resize event
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      // Also trigger a custom event for components to listen to
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
    }, 100);
  }, []);

  // Memoize the isRTL value
  const isRTL = useMemo(() => currentLanguage === 'ar', [currentLanguage]);

  useEffect(() => {
    // Set initial direction and language only once
    console.log('Setting initial language:', currentLanguage);
    if (currentLanguage === 'ar') {
      document.dir = 'rtl';
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.remove('ltr');
      document.body.classList.add('rtl');
      document.documentElement.setAttribute('data-dir', 'rtl');
    } else {
      document.dir = 'ltr';
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.remove('rtl');
      document.body.classList.add('ltr');
      document.documentElement.setAttribute('data-dir', 'ltr');
    }
  }, [currentLanguage]);

  return useMemo(() => ({
    currentLanguage,
    changeLanguage,
    t,
    isRTL
  }), [currentLanguage, changeLanguage, t, isRTL]);
};
