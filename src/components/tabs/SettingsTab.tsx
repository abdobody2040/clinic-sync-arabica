
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Palette } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCurrency } from '@/hooks/useCurrency';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

export const SettingsTab: React.FC = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { currentCurrency, changeCurrency, currencies } = useCurrency();
  const { settings, updateSettings } = useAppSettings();
  const { profile, updateProfile } = useUserProfile();
  const { toast } = useToast();
  
  const [appName, setAppName] = useState(settings.appName);
  const [clinicName, setClinicName] = useState(settings.clinicName);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    specialization: profile.specialization
  });

  const handleAppSettingsSave = () => {
    const newSettings: any = {
      appName,
      clinicName
    };
    
    if (logoFile) {
      // In a real app, you'd upload the file here
      // For demo, we'll use a placeholder URL
      newSettings.logoUrl = URL.createObjectURL(logoFile);
    }
    
    updateSettings(newSettings);
    toast({
      title: t("success"),
      description: t("appSettingsUpdated"),
    });
  };

  const handleProfileSave = () => {
    updateProfile(profileForm);
    toast({
      title: t("success"),
      description: t("profileUpdated"),
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* App Customization */}
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

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {t("profileSettings")}
          </CardTitle>
          <CardDescription>Manage your personal information and professional details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>{t("fullName")}</Label>
              <Input 
                value={profileForm.name} 
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label>{t("emailAddress")}</Label>
              <Input 
                type="email"
                value={profileForm.email} 
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label>{t("phoneNumber")}</Label>
              <Input 
                value={profileForm.phone} 
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
              />
            </div>
            
            <div>
              <Label>{t("address")}</Label>
              <Input 
                value={profileForm.address} 
                onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
              />
            </div>
            
            <div>
              <Label>{t("specialization")}</Label>
              <Input 
                value={profileForm.specialization} 
                onChange={(e) => setProfileForm({...profileForm, specialization: e.target.value})}
              />
            </div>
            
            <div>
              <Label>{t("licenseNumber")}</Label>
              <Input value={profile.licenseNumber} disabled className="bg-gray-100" />
            </div>
            
            <Button onClick={handleProfileSave}>
              {t("save")} Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            {t("systemSettings")}
          </CardTitle>
          <CardDescription>{t("configureSettings")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{t("languageSettings")}</h3>
              <div className="mt-4">
                <Label>{t("defaultLanguage")}</Label>
                <div className="flex space-x-4 mt-2">
                  <Button 
                    variant={currentLanguage === 'en' ? 'default' : 'outline'}
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </Button>
                  <Button 
                    variant={currentLanguage === 'ar' ? 'default' : 'outline'}
                    onClick={() => changeLanguage('ar')}
                  >
                    العربية
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">{t("currencySettings")}</h3>
              <div className="mt-4">
                <Label>{t("defaultCurrency")}</Label>
                <Select value={currentCurrency} onValueChange={changeCurrency}>
                  <SelectTrigger className="w-48 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
