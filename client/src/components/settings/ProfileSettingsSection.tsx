import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

export const ProfileSettingsSection: React.FC = () => {
  const { t } = useLanguage();
  const { profile, updateProfile } = useUserProfile();
  const { toast } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    specialization: profile.specialization
  });

  const handleProfileSave = () => {
    updateProfile(profileForm);
    toast({
      title: t("success"),
      description: t("profileUpdated"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          {t("profileSettings")}
        </CardTitle>
        <CardDescription>{t('managePersonalAndProfessionalInfo')}</CardDescription>
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
  );
};