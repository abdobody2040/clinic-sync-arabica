
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope, Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface LicenseScreenProps {
  licenseKey: string;
  setLicenseKey: (key: string) => void;
  onLicenseActivation: () => void;
}

export const LicenseScreen: React.FC<LicenseScreenProps> = ({
  licenseKey,
  setLicenseKey,
  onLicenseActivation
}) => {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{t("clinicManagementSystem")}</CardTitle>
          <CardDescription>{t("enterLicenseKey")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license">{t("licenseKey")}</Label>
            <Input
              id="license"
              placeholder={t("licenseKey")}
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
            />
          </div>
          <Button onClick={onLicenseActivation} className="w-full">
            <Shield className="w-4 h-4 mr-2" />
            {t("activateLicense")}
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            {t("demoLicense")}: <code className="bg-muted px-2 py-1 rounded">DEMO-TRIAL-2024-ABCD</code>
          </div>
          
          <div className="flex justify-center space-x-2">
            <Button 
              variant={currentLanguage === 'en' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => changeLanguage('en')}
            >
              English
            </Button>
            <Button 
              variant={currentLanguage === 'ar' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => changeLanguage('ar')}
            >
              العربية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
