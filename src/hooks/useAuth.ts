
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
        console.log("Found license, setting active");
        setLicenseStatus("active");
      } else {
        console.log("No license found, setting expired");
        setLicenseStatus("expired");
      }
    }
  }, [profile]);

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

  const handleLicenseActivation = () => {
    console.log("License activation attempted with:", licenseKey);
    if (licenseKey === "DEMO-TRIAL-2024-ABCD") {
      console.log("License activated successfully");
      localStorage.setItem("clinic_license", licenseKey);
      setLicenseStatus("active");
      toast({
        title: t("success"),
        description: "License activated successfully!",
      });
    } else {
      console.log("Invalid license key");
      toast({
        title: t("error"),
        description: "Please enter a valid license key. Demo: DEMO-TRIAL-2024-ABCD",
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
