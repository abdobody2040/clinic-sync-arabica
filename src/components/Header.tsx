
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings, Home, Calendar, Users, FileText, Package, BarChart, Menu } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAppSettings } from '@/hooks/useAppSettings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  currentUser: { name: string; role: string; email: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const { t } = useLanguage();
  const { settings } = useAppSettings();

  const navigationItems = [
    { name: 'Dashboard', icon: Home, href: '#dashboard' },
    { name: 'Patients', icon: Users, href: '#patients' },
    { name: 'Appointments', icon: Calendar, href: '#appointments' },
    { name: 'Billing', icon: FileText, href: '#billing' },
    { name: 'Inventory', icon: Package, href: '#inventory' },
    { name: 'Reports', icon: BarChart, href: '#reports' },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            {settings.logoUrl && (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="h-8 w-8 object-contain flex-shrink-0"
              />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {settings.appName}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {t("licensed")}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* Right side - User Menu and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {currentUser && (
              <>
                {/* Desktop User Info */}
                <div className="hidden lg:flex items-center space-x-3 mr-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500">{currentUser.role}</p>
                  </div>
                </div>

                {/* Mobile Menu (Navigation + User) */}
                <div className="lg:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white">
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      {/* Navigation Items for Mobile */}
                      <DropdownMenuSeparator />
                      {navigationItems.map((item) => (
                        <DropdownMenuItem key={item.name} className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </DropdownMenuItem>
                      ))}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onLogout} className="flex items-center space-x-2 text-red-600">
                        <LogOut className="h-4 w-4" />
                        <span>{t("logout")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Desktop User Dropdown Menu */}
                <div className="hidden lg:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{currentUser.name.split(' ')[0]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white">
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onLogout} className="flex items-center space-x-2 text-red-600">
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
