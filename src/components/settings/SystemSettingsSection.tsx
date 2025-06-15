
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCurrency } from '@/hooks/useCurrency';

export const SystemSettingsSection: React.FC = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { currentCurrency, changeCurrency, currencies } = useCurrency();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          {t("systemSettings")}
        </CardTitle>
        <CardDescription>{t("configureSettings")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{t("languageSettings")}</h3>
            <div className="mt-4">
              <Label>{t("defaultLanguage")}</Label>
              <div className="flex space-x-4 mt-2">
                <Button 
                  variant={currentLanguage === 'en' ? 'default' : 'outline'}
                  onClick={() => changeLanguage('en')}
                >
                  English
                </Button>
                <Button 
                  variant={currentLanguage === 'ar' ? 'default' : 'outline'}
                  onClick={() => changeLanguage('ar')}
                >
                  العربية
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">{t("currencySettings")}</h3>
            <div className="mt-4">
              <Label>{t("defaultCurrency")}</Label>
              <Select value={currentCurrency} onValueChange={changeCurrency}>
                <SelectTrigger className="w-48 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
