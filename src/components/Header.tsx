
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
          <div className="flex items-center space-x-3 flex-shrink-0">
            {settings.logoUrl && (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="h-8 w-8 object-contain flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {settings.appName}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {t("licensed")}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Medium screens and up */}
          <nav className="hidden md:flex items-center space-x-2 flex-1 justify-center max-w-4xl mx-6">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="hidden lg:inline">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {currentUser && (
              <>
                {/* User Info - Desktop only */}
                <div className="hidden lg:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
                  </div>
                </div>

                {/* Mobile Navigation Menu - Small screens only */}
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-white border shadow-lg z-[60]">
                      {/* User info header */}
                      <div className="px-3 py-3 border-b bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      {/* Navigation Items */}
                      <div className="py-1">
                        {navigationItems.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <a href={item.href} className="flex items-center space-x-3 px-3 py-2 text-sm">
                              <item.icon className="h-4 w-4 text-gray-500" />
                              <span>{item.name}</span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Settings and Logout */}
                      <div className="py-1">
                        <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2">
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={onLogout} 
                          className="flex items-center space-x-3 px-3 py-2 text-red-600 focus:text-red-600"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t("logout")}</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Desktop User Menu - Medium screens and up */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2 h-9">
                        <User className="h-4 w-4" />
                        <span className="hidden lg:inline">{currentUser.name.split(' ')[0]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg z-[60]">
                      <div className="px-3 py-3 border-b bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      <div className="py-1">
                        <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2">
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={onLogout} 
                          className="flex items-center space-x-3 px-3 py-2 text-red-600 focus:text-red-600"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t("logout")}</span>
                        </DropdownMenuItem>
                      </div>
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
