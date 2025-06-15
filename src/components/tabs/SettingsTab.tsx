
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { AppCustomizationSection } from '@/components/settings/AppCustomizationSection';
import { PrescriptionSettingsSection } from '@/components/settings/PrescriptionSettingsSection';
import { ProfileSettingsSection } from '@/components/settings/ProfileSettingsSection';
import { SystemSettingsSection } from '@/components/settings/SystemSettingsSection';

export const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <AppCustomizationSection />
      <PrescriptionSettingsSection />
      <ProfileSettingsSection />
      <Separator />
      <SystemSettingsSection />
    </div>
  );
};
