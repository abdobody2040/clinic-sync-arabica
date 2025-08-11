
import { useState, useEffect, useCallback } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  licenseNumber: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const stored = localStorage.getItem('user_profile');
    return stored ? JSON.parse(stored) : {
      name: 'Dr. Ahmed',
      email: 'admin@test.com',
      phone: '+971 50 123 4567',
      address: 'Dubai Healthcare City',
      specialization: 'General Medicine',
      licenseNumber: 'DEMO-TRIAL-2024-ABCD'
    };
  });

  const updateProfile = useCallback((newProfile: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...newProfile };
    setProfile(updatedProfile);
    localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
  }, [profile]);

  return {
    profile,
    updateProfile
  };
};
