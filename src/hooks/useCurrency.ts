
import { useState, useEffect, useMemo, useCallback } from 'react';

export type Currency = 'AED' | 'USD' | 'EUR' | 'SAR' | 'EGP';

interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const currencies: CurrencyInfo[] = [
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
  { code: 'EGP', symbol: 'EGP', name: 'Egyptian Pound' },
];

export const useCurrency = () => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    const stored = localStorage.getItem('clinic_currency');
    return (stored as Currency) || 'AED';
  });

  const changeCurrency = useCallback((currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem('clinic_currency', currency);
  }, []);

  const formatAmount = useCallback((amount: number): string => {
    const currencyInfo = currencies.find(c => c.code === currentCurrency);
    return `${currencyInfo?.symbol || 'AED'} ${amount.toFixed(2)}`;
  }, [currentCurrency]);

  const getCurrentCurrencyInfo = useMemo(() => {
    return currencies.find(c => c.code === currentCurrency) || currencies[0];
  }, [currentCurrency]);

  return useMemo(() => ({
    currentCurrency,
    changeCurrency,
    formatAmount,
    getCurrentCurrencyInfo,
    currencies
  }), [currentCurrency, changeCurrency, formatAmount, getCurrentCurrencyInfo]);
};
