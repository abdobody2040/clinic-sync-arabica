
import { useState, useCallback } from 'react';

interface PrescriptionSettings {
  header: string;
  footer: string;
  showLogo: boolean;
  fontSize: string;
}

export const usePrescriptionSettings = () => {
  const [prescriptionSettings, setPrescriptionSettings] = useState<PrescriptionSettings>(() => {
    const stored = localStorage.getItem('prescription_settings');
    return stored ? JSON.parse(stored) : {
      header: 'Professional Medical Care - Your Health is Our Priority',
      footer: 'This prescription is valid for 30 days from the date of issue. Please follow the instructions carefully.',
      showLogo: true,
      fontSize: 'medium'
    };
  });

  const updatePrescriptionSettings = useCallback((newSettings: Partial<PrescriptionSettings>) => {
    const updatedSettings = { ...prescriptionSettings, ...newSettings };
    setPrescriptionSettings(updatedSettings);
    localStorage.setItem('prescription_settings', JSON.stringify(updatedSettings));
  }, [prescriptionSettings]);

  return {
    prescriptionSettings,
    updatePrescriptionSettings
  };
};
