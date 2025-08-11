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

  // Set initial language from localStorage or default to 'en'
  useEffect(() => {
    console.log('Setting initial language:', currentLanguage);

    // Clean up existing classes
    document.body.classList.remove('rtl', 'ltr', 'ar', 'en');
    document.documentElement.classList.remove('rtl', 'ltr', 'ar', 'en');

    if (currentLanguage === 'ar') {
      document.dir = 'rtl';
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl', 'ar');
      document.documentElement.classList.add('rtl', 'ar');
      document.documentElement.setAttribute('data-dir', 'rtl');
      document.documentElement.setAttribute('data-lang', 'ar');
    } else {
      document.dir = 'ltr';
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.add('ltr', 'en');
      document.documentElement.classList.add('ltr', 'en');
      document.documentElement.setAttribute('data-dir', 'ltr');
      document.documentElement.setAttribute('data-lang', 'en');
    }
  }, [currentLanguage]);

  return useMemo(() => ({
    currentLanguage,
    changeLanguage,
    t,
    isRTL
  }), [currentLanguage, changeLanguage, t, isRTL]);
};