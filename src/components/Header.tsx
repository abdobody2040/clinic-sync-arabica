
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Menu } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAppSettings } from '@/hooks/useAppSettings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  currentUser: { name: string; role: string; email: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const { t } = useLanguage();
  const { settings } = useAppSettings();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            {settings.logoUrl && (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 object-contain flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 truncate">
                {settings.appName}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {t("licensed")}
              </p>
            </div>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-2">
            {currentUser && (
              <>
                {/* Desktop User Info */}
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-32 lg:max-w-none">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500">{currentUser.role}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t("logout")}</span>
                  </Button>
                </div>

                {/* Mobile User Menu */}
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <Menu className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      <DropdownMenuItem onClick={onLogout} className="flex items-center space-x-2">
                        <LogOut className="h-4 w-4" />
                        <span>{t("logout")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
