
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useToast } from '@/hooks/use-toast';

export const AppCustomizationSection: React.FC = () => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useAppSettings();
  const { toast } = useToast();
  
  const [appName, setAppName] = useState(settings.appName);
  const [clinicName, setClinicName] = useState(settings.clinicName);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleAppSettingsSave = () => {
    const newSettings: any = {
      appName,
      clinicName
    };
    
    if (logoFile) {
      newSettings.logoUrl = URL.createObjectURL(logoFile);
    }
    
    updateSettings(newSettings);
    toast({
      title: t("success"),
      description: t("appSettingsUpdated"),
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          {t("appCustomization")}
        </CardTitle>
        <CardDescription>Customize the appearance and branding of your application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>{t("applicationName")}</Label>
            <Input 
              value={appName} 
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Enter application name"
            />
          </div>
          
          <div>
            <Label>{t("clinicName")}</Label>
            <Input 
              value={clinicName} 
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="Enter clinic name"
            />
          </div>
          
          <div>
            <Label>{t("logoUpload")}</Label>
            <div className="mt-2">
              {settings.logoUrl && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-1">{t("currentLogo")}:</p>
                  <img src={settings.logoUrl} alt="Current logo" className="w-16 h-16 object-contain border rounded" />
                </div>
              )}
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleLogoChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          
          <Button onClick={handleAppSettingsSave}>
            {t("save")} {t("settings")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
