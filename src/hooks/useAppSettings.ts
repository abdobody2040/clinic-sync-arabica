
import { useState, useEffect, useCallback } from 'react';

interface AppSettings {
  appName: string;
  logoUrl: string;
  clinicName: string;
}

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem('app_settings');
    return stored ? JSON.parse(stored) : {
      appName: 'Clinic Management System',
      logoUrl: '',
      clinicName: 'Al-Shifa Medical Center'
    };
  });

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('app_settings', JSON.stringify(updatedSettings));
  }, [settings]);

  return {
    settings,
    updateSettings
  };
};
