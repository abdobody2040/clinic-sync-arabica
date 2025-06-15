
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, Shield, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
  currentUser: { name: string; role: string; email: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const { currentLanguage, changeLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">{t("clinicManagementSystem")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              <Shield className="w-3 h-3 mr-1" />
              {t("licensed")}
            </Badge>
            
            <Select value={currentLanguage} onValueChange={changeLanguage}>
              <SelectTrigger className="w-32">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
            
            <span className="text-sm text-gray-600">{t("welcome")}, {currentUser?.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              {t("logout")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
