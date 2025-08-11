
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

export const useInvoices = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleCreateInvoice = () => {
    console.log("Create Invoice button clicked");
    setShowInvoiceForm(true);
  };

  const handleInvoiceSubmit = (data: any) => {
    console.log("Invoice form submitted:", data);
    setShowInvoiceForm(false);
    toast({
      title: t("success"),
      description: "Invoice created successfully!",
    });
  };

  return {
    showInvoiceForm,
    setShowInvoiceForm,
    handleCreateInvoice,
    handleInvoiceSubmit
  };
};
