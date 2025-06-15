
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope } from 'lucide-react';
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
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{t("welcomeBack")}</CardTitle>
          <CardDescription>{t("signInToAccount")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("email")}
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("password")}
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("signIn")}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            {t("demoLogin")}: <code className="bg-muted px-2 py-1 rounded">admin@test.com / password123</code>
          </div>
          
          <div className="flex justify-center space-x-2 mt-4">
            <Button 
              variant={currentLanguage === 'en' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => changeLanguage('en')}
            >
              English
            </Button>
            <Button 
              variant={currentLanguage === 'ar' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => changeLanguage('ar')}
            >
              العربية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
