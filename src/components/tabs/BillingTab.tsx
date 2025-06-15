
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCurrency } from '@/hooks/useCurrency';
import { InvoiceForm } from '@/components/InvoiceForm';

interface BillingTabProps {
  showInvoiceForm: boolean;
  onCreateInvoice: () => void;
  onInvoiceSubmit: (data: any) => void;
  onCancelInvoiceForm: () => void;
}

export const BillingTab: React.FC<BillingTabProps> = ({
  showInvoiceForm,
  onCreateInvoice,
  onInvoiceSubmit,
  onCancelInvoiceForm
}) => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();

  if (showInvoiceForm) {
    return (
      <InvoiceForm 
        onSubmit={onInvoiceSubmit}
        onCancel={onCancelInvoiceForm}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {t("billingInvoices")}
        </CardTitle>
        <CardDescription className="text-sm">{t("manageInvoices")}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Input 
              placeholder={t("searchInvoices")} 
              className="w-full sm:max-w-sm" 
            />
            <Button onClick={onCreateInvoice} className="w-full sm:w-auto">
              {t("createInvoice")}
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="border rounded-lg min-w-[600px]">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-3 sm:p-4 text-sm font-medium">{t("invoiceNumber")}</th>
                    <th className="text-left p-3 sm:p-4 text-sm font-medium">{t("patient")}</th>
                    <th className="text-left p-3 sm:p-4 text-sm font-medium">{t("amount")}</th>
                    <th className="text-left p-3 sm:p-4 text-sm font-medium">{t("status")}</th>
                    <th className="text-left p-3 sm:p-4 text-sm font-medium">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 sm:p-4 text-sm">#INV-001</td>
                    <td className="p-3 sm:p-4 text-sm">Ahmed Al-Mansouri</td>
                    <td className="p-3 sm:p-4 text-sm font-medium">{formatAmount(350.00)}</td>
                    <td className="p-3 sm:p-4">
                      <Badge variant="secondary" className="text-xs">{t("paid")}</Badge>
                    </td>
                    <td className="p-3 sm:p-4">
                      <Button variant="outline" size="sm" className="text-xs">
                        {t("view")}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
