
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
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          {t("billingInvoices")}
        </CardTitle>
        <CardDescription>{t("manageInvoices")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Input placeholder={t("searchInvoices")} className="max-w-sm" />
            <Button onClick={onCreateInvoice}>{t("createInvoice")}</Button>
          </div>
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4">{t("invoiceNumber")}</th>
                  <th className="text-left p-4">{t("patient")}</th>
                  <th className="text-left p-4">{t("amount")}</th>
                  <th className="text-left p-4">{t("status")}</th>
                  <th className="text-left p-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">#INV-001</td>
                  <td className="p-4">Ahmed Al-Mansouri</td>
                  <td className="p-4">{formatAmount(350.00)}</td>
                  <td className="p-4">
                    <Badge variant="secondary">{t("paid")}</Badge>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm">{t("view")}</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
