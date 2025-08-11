
import { useState, useEffect } from 'react';

interface LicenseInfo {
  license_key: string;
  customer_name: string;
  license_type: string;
  expires_at: string | null;
  features: any;
}

export const useLicense = () => {
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLicense = localStorage.getItem('clinic_license');
    if (storedLicense) {
      try {
        const parsedLicense = JSON.parse(storedLicense);
        setLicenseInfo(parsedLicense);
      } catch (error) {
        console.error('Error parsing stored license:', error);
        localStorage.removeItem('clinic_license');
      }
    }
    setIsLoading(false);
  }, []);

  const clearLicense = () => {
    localStorage.removeItem('clinic_license');
    setLicenseInfo(null);
  };

  const hasFeature = (feature: string): boolean => {
    if (!licenseInfo?.features) return false;
    return licenseInfo.features[feature] === true;
  };

  const isExpired = (): boolean => {
    if (!licenseInfo?.expires_at) return false;
    return new Date(licenseInfo.expires_at) < new Date();
  };

  const getLicenseType = (): string => {
    return licenseInfo?.license_type || 'trial';
  };

  const getCustomerName = (): string => {
    return licenseInfo?.customer_name || '';
  };

  const getMaxUsers = (): number => {
    const type = getLicenseType();
    switch (type) {
      case 'trial': return 1;
      case 'standard': return 5;
      case 'premium': return 20;
      default: return 1;
    }
  };

  const getMaxPatients = (): number => {
    const type = getLicenseType();
    switch (type) {
      case 'trial': return 50;
      case 'standard': return 500;
      case 'premium': return 10000;
      default: return 50;
    }
  };

  return {
    licenseInfo,
    isLoading,
    clearLicense,
    hasFeature,
    isExpired,
    getLicenseType,
    getCustomerName,
    getMaxUsers,
    getMaxPatients,
    isLicensed: !!licenseInfo && !isExpired()
  };
};
