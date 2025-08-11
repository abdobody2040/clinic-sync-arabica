
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface LoginScreenProps {
  loginForm: { email: string; password: string };
  setLoginForm: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
  onLogin: (e: React.FormEvent) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  loginForm,
  setLoginForm,
  onLogin
}) => {
  const { t, currentLanguage, changeLanguage, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{t("welcomeBack")}</CardTitle>
          <CardDescription className={isRTL ? 'text-right' : ''}>{t("signInToAccount")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={isRTL ? 'text-right block' : ''}>{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("email")}
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                required
                className={isRTL ? 'text-right' : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className={isRTL ? 'text-right block' : ''}>{t("password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("password")}
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
                className={isRTL ? 'text-right' : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <Button type="submit" className="w-full">
              {t("signIn")}
            </Button>
          </form>
          
          <div className={`mt-4 text-sm text-muted-foreground text-center ${isRTL ? 'text-right' : ''}`}>
            <div className="mb-2">
              {t("demoLogin")}:
            </div>
            <code className="bg-muted px-2 py-1 rounded text-xs block">
              admin@test.com / password123
            </code>
          </div>
          
          {/* Language Selector */}
          <div className="mt-6 pt-4 border-t">
            <div className={`flex items-center justify-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Globe className={`w-4 h-4 text-gray-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="text-sm font-medium text-gray-700">
                {isRTL ? "اختر اللغة" : "Choose Language"}
              </span>
            </div>
            <div className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Button 
                variant={currentLanguage === 'en' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLanguage('en')}
                className="min-w-[80px]"
              >
                English
              </Button>
              <Button 
                variant={currentLanguage === 'ar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLanguage('ar')}
                className="min-w-[80px]"
              >
                العربية
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
