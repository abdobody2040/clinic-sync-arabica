import { Language, Translations, TranslationKey } from './types';
import en from './en';
import ar from './ar';

export type { Language, Translations, TranslationKey };

export const translations: Record<Language, Translations> = {
  en,
  ar,
};