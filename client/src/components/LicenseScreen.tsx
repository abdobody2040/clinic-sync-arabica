
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope, Shield, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [demoKey, setDemoKey] = useState<string>('Loading...');

  const handleLicenseValidation = async () => {
    if (!licenseKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license key",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);

    try {
      const data = await apiRequest('/api/rpc/validate_license', {
        method: 'POST',
        body: JSON.stringify({
          input_license_key: licenseKey.trim()
        })
      });

      const licenseData = data?.[0];

      if (!licenseData || !licenseData.is_valid) {
        const errorMessage = licenseData?.status === 'not_found' 
          ? "License key not found" 
          : licenseData?.status === 'expired'
          ? "License has expired"
          : "Invalid license key";

        toast({
          title: "Invalid License",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      // License is valid, store license info and proceed
      localStorage.setItem('clinic_license', JSON.stringify({
        license_key: licenseKey,
        customer_name: licenseData.customer_name,
        license_type: licenseData.license_type,
        expires_at: licenseData.expires_at,
        features: licenseData.features
      }));

      toast({
        title: "License Activated",
        description: `Welcome ${licenseData.customer_name}! License: ${licenseData.license_type}`,
      });

      onLicenseActivation();

    } catch (error) {
      console.error('License validation failed:', error);
      toast({
        title: "Validation Failed",
        description: "An error occurred while validating the license",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  // Get a real demo license key from the database
  const getDemoLicenseKey = async () => {
    try {
      const data = await apiRequest('/api/rpc/get_all_licenses');
      if (data && data.length > 0) {
        return data[0].license_key;
      }
    } catch (error) {
      console.error('Error fetching demo license:', error);
    }
    return 'TRL-2025-DEMO1234'; // Fallback
  };

  useEffect(() => {
    getDemoLicenseKey().then(setDemoKey);
  }, []);

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
              disabled={isValidating}
            />
          </div>
          <Button 
            onClick={handleLicenseValidation} 
            className="w-full"
            disabled={isValidating}
          >
            {isValidating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Shield className="w-4 h-4 mr-2" />
            )}
            {isValidating ? 'Validating...' : t("activateLicense")}
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            {t("demoLicense")}: <code className="bg-muted px-2 py-1 rounded cursor-pointer" onClick={() => setLicenseKey(demoKey)}>{demoKey}</code>
          </div>
          
          <div className="flex justify-center space-x-2">
            <Button 
              variant={currentLanguage === 'en' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => changeLanguage('en')}
              disabled={isValidating}
            >
              English
            </Button>
            <Button 
              variant={currentLanguage === 'ar' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => changeLanguage('ar')}
              disabled={isValidating}
            >
              العربية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
