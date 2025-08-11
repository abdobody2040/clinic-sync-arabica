import React from 'react';
import { Separator } from '@/components/ui/separator';
import { AppCustomizationSection } from '@/components/settings/AppCustomizationSection';
import { PrescriptionSettingsSection } from '@/components/settings/PrescriptionSettingsSection';
import { RegularPrescriptionsSection } from '@/components/settings/RegularPrescriptionsSection';
import { ProfileSettingsSection } from '@/components/settings/ProfileSettingsSection';
import { SystemSettingsSection } from '@/components/settings/SystemSettingsSection';
import { useLanguage } from '@/hooks/useLanguage';
import { Settings, User, Palette, FileText, Bell } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    { id: 'profile', label: t('profileSettings'), icon: User },
    { id: 'app', label: t('appCustomization'), icon: Palette },
    { id: 'prescriptions', label: t('prescriptionSettings'), icon: FileText },
    { id: 'regular', label: t('regularPrescriptions'), icon: Bell },
    { id: 'system', label: t('systemSettings'), icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <AppCustomizationSection />
      <PrescriptionSettingsSection />
      <RegularPrescriptionsSection />
      <ProfileSettingsSection />
      <Separator />
      <SystemSettingsSection />
    </div>
  );
};