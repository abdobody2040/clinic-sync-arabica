
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserProfile } from '@/hooks/useUserProfile';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [licenseStatus, setLicenseStatus] = useState("checking");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [licenseKey, setLicenseKey] = useState("");
  
  const { toast } = useToast();
  const { t } = useLanguage();
  const { profile } = useUserProfile();

  useEffect(() => {
    console.log("useEffect running for auth check");
    const token = localStorage.getItem("auth_token");
    if (token) {
      console.log("Found auth token, setting authenticated");
      setIsAuthenticated(true);
      setCurrentUser({ 
        name: profile.name, 
        role: "admin", 
        email: profile.email 
      });
      setLicenseStatus("active");
    } else {
      const license = localStorage.getItem("clinic_license");
      if (license) {
        console.log("Found stored license, validating...");
        validateStoredLicense(license);
      } else {
        console.log("No license found, setting expired");
        setLicenseStatus("expired");
      }
    }
  }, [profile]);

  const validateStoredLicense = async (license: string) => {
    try {
      const response = await fetch('/api/rpc/validate_license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_license_key: license
        })
      });
      
      const data = await response.json();
      const licenseData = data?.[0];
      
      if (licenseData && licenseData.is_valid) {
        console.log("Stored license is valid");
        setLicenseStatus("active");
        setLicenseKey(license);
      } else {
        console.log("Stored license is invalid, removing");
        localStorage.removeItem("clinic_license");
        localStorage.removeItem("license_data");
        setLicenseStatus("expired");
      }
    } catch (error) {
      console.error("License validation error:", error);
      setLicenseStatus("expired");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", loginForm.email);
    
    if (loginForm.email === "admin@test.com" && loginForm.password === "password123") {
      console.log("Login successful");
      localStorage.setItem("auth_token", "demo_token");
      setIsAuthenticated(true);
      setCurrentUser({ 
        name: profile.name, 
        role: "admin", 
        email: profile.email 
      });
      toast({
        title: t("success"),
        description: t("welcomeBack"),
      });
    } else {
      console.log("Login failed");
      toast({
        title: t("error"),
        description: "Invalid credentials. Use admin@test.com / password123",
        variant: "destructive",
      });
    }
  };

  const handleLicenseActivation = async () => {
    console.log("License activation attempted with:", licenseKey);
    
    if (!licenseKey.trim()) {
      toast({
        title: t("error"),
        description: "Please enter a license key",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await fetch('/api/rpc/validate_license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_license_key: licenseKey.trim()
        })
      });
      
      const data = await response.json();
      const licenseData = data?.[0];
      
      if (licenseData && licenseData.is_valid) {
        console.log("License activated successfully");
        localStorage.setItem("clinic_license", licenseKey);
        localStorage.setItem("license_data", JSON.stringify(licenseData));
        setLicenseStatus("active");
        toast({
          title: t("success"),
          description: `License activated for ${licenseData.customer_name}!`,
        });
      } else {
        console.log("Invalid license key");
        toast({
          title: t("error"),
          description: "Invalid license key. Demo key: TRL-2025-DEMO1234",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("License validation error:", error);
      toast({
        title: t("error"),
        description: "Unable to validate license. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: t("success"),
      description: "You have been logged out",
    });
  };

  return {
    isAuthenticated,
    currentUser,
    licenseStatus,
    loginForm,
    setLoginForm,
    licenseKey,
    setLicenseKey,
    handleLogin,
    handleLicenseActivation,
    handleLogout
  };
};
