
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCurrency } from '@/hooks/useCurrency';

export const SystemSettingsSection: React.FC = () => {
  const { t, currentLanguage, changeLanguage, isRTL } = useLanguage();
  const { currentCurrency, changeCurrency, currencies } = useCurrency();

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Settings className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t("systemSettings")}
        </CardTitle>
        <CardDescription>{t("configureSettings")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Globe className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-gray-500`} />
              <h3 className="text-lg font-medium">{t("languageSettings")}</h3>
            </div>
            <div className="mt-4">
              <Label>{t("defaultLanguage")}</Label>
              <div className={`flex mt-2 ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
                <Button 
                  variant={currentLanguage === 'en' ? 'default' : 'outline'}
                  onClick={() => changeLanguage('en')}
                  className="min-w-[100px]"
                >
                  English
                </Button>
                <Button 
                  variant={currentLanguage === 'ar' ? 'default' : 'outline'}
                  onClick={() => changeLanguage('ar')}
                  className="min-w-[100px]"
                >
                  العربية
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {isRTL 
                  ? "سيتم تطبيق اللغة المختارة على جميع واجهات النظام"
                  : "Selected language will be applied to all system interfaces"
                }
              </p>
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
              <p className="text-xs text-gray-500 mt-2">
                {t("currencySettings")} {isRTL ? "المستخدمة في الفواتير والتقارير المالية" : "used in invoices and financial reports"}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                {isRTL ? "معلومات مهمة" : "Important Information"}
              </h4>
              <ul className={`text-sm text-blue-800 space-y-1 ${isRTL ? 'text-right' : ''}`}>
                <li>
                  {isRTL 
                    ? "• سيتم حفظ إعداداتك تلقائياً" 
                    : "• Your settings will be saved automatically"
                  }
                </li>
                <li>
                  {isRTL 
                    ? "• تغيير اللغة سيؤثر على جميع أجزاء النظام" 
                    : "• Language changes will affect all parts of the system"
                  }
                </li>
                <li>
                  {isRTL 
                    ? "• العملة المختارة ستظهر في جميع التقارير المالية" 
                    : "• Selected currency will appear in all financial reports"
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
