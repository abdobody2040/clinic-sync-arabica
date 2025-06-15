
import { useState, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('clinic_language');
    return (stored as Language) || 'en';
  });

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  const changeLanguage = (language: Language) => {
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
  };

  useEffect(() => {
    // Set initial direction and language
    if (currentLanguage === 'ar') {
      document.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [currentLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    t,
    isRTL: currentLanguage === 'ar'
  };
};
