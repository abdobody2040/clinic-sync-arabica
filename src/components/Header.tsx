
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
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, activeTab = 'patients', onTabChange }) => {
  const { t, isRTL } = useLanguage();
  const { settings } = useAppSettings();

  const navigationItems = [
    { id: 'patients', name: t("patients"), icon: Users },
    { id: 'appointments', name: t("appointments"), icon: Calendar },
    { id: 'billing', name: t("billing"), icon: FileText },
    { id: 'reports', name: t("reports"), icon: BarChart },
    { id: 'inventory', name: t("inventory"), icon: Package },
    { id: 'settings', name: t("settings"), icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo and App Name */}
          <div className={`flex items-center flex-shrink-0 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            {settings.logoUrl && (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="h-8 w-8 object-contain flex-shrink-0"
              />
            )}
            <div className={`min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {settings.appName}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {t("licensed")}
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs - Medium screens and up */}
          <nav className={`hidden md:flex items-center flex-1 justify-center max-w-4xl mx-6 ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <item.icon className={`h-4 w-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="hidden lg:inline">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Right side - User actions */}
          <div className={`flex items-center flex-shrink-0 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            {currentUser && (
              <>
                {/* User Info - Desktop only */}
                <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
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
                    <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-64 bg-white border shadow-lg z-[60]">
                      {/* User info header */}
                      <div className="px-3 py-3 border-b bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      {/* Navigation Items */}
                      <div className="py-1">
                        {navigationItems.map((item) => (
                          <DropdownMenuItem 
                            key={item.id} 
                            onClick={() => handleTabClick(item.id)}
                            className={isRTL ? 'flex-row-reverse' : ''}
                          >
                            <div className={`flex items-center px-3 py-2 text-sm w-full ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}>
                              <item.icon className="h-4 w-4 text-gray-500" />
                              <span>{item.name}</span>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Logout */}
                      <div className="py-1">
                        <DropdownMenuItem 
                          onClick={onLogout} 
                          className={`flex items-center px-3 py-2 text-red-600 focus:text-red-600 ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}
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
                      <Button variant="outline" size="sm" className={`flex items-center h-9 ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                        <User className="h-4 w-4" />
                        <span className="hidden lg:inline">{currentUser.name.split(' ')[0]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56 bg-white border shadow-lg z-[60]">
                      <div className="px-3 py-3 border-b bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      <div className="py-1">
                        <DropdownMenuItem className={`flex items-center px-3 py-2 ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}>
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span>{t("settings")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={onLogout} 
                          className={`flex items-center px-3 py-2 text-red-600 focus:text-red-600 ${isRTL ? 'space-x-reverse space-x-3 flex-row-reverse' : 'space-x-3'}`}
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
