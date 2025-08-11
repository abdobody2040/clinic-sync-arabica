
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Trash2 } from 'lucide-react';

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be positive'),
});

const invoiceSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  notes: z.string().optional(),
  discount: z.number().min(0).max(100).optional(),
  tax: z.number().min(0).max(100).optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
  onCancel: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      patientName: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
      notes: '',
      discount: 0,
      tax: 5,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const watchedItems = form.watch('items');
  const watchedDiscount = form.watch('discount') || 0;
  const watchedTax = form.watch('tax') || 0;

  const subtotal = watchedItems.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);

  const discountAmount = (subtotal * watchedDiscount) / 100;
  const taxAmount = ((subtotal - discountAmount) * watchedTax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const handleSubmit = (data: InvoiceFormData) => {
    console.log('Submitting invoice data:', data);
    onSubmit(data);
    toast({
      title: t("success"),
      description: "Invoice created successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Select onValueChange={(value) => form.setValue('patientName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ahmed Al-Mansouri">Ahmed Al-Mansouri</SelectItem>
                  <SelectItem value="Fatima Hassan">Fatima Hassan</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.patientName && (
                <p className="text-sm text-red-500">{form.formState.errors.patientName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="invoiceDate">Invoice Date *</Label>
              <Input type="date" {...form.register('invoiceDate')} />
              {form.formState.errors.invoiceDate && (
                <p className="text-sm text-red-500">{form.formState.errors.invoiceDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input type="date" {...form.register('dueDate')} />
              {form.formState.errors.dueDate && (
                <p className="text-sm text-red-500">{form.formState.errors.dueDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Invoice Items</h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
              >
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded">
                  <div>
                    <Label>Description *</Label>
                    <Input 
                      {...form.register(`items.${index}.description`)}
                      placeholder="Service or item description"
                    />
                    {form.formState.errors.items?.[index]?.description && (
                      <p className="text-sm text-red-500">{form.formState.errors.items[index].description.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Quantity *</Label>
                    <Input 
                      type="number"
                      {...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
                      min="1"
                    />
                    {form.formState.errors.items?.[index]?.quantity && (
                      <p className="text-sm text-red-500">{form.formState.errors.items[index].quantity.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Unit Price (AED) *</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      {...form.register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                      min="0"
                    />
                    {form.formState.errors.items?.[index]?.unitPrice && (
                      <p className="text-sm text-red-500">{form.formState.errors.items[index].unitPrice.message}</p>
                    )}
                  </div>

                  <div className="flex items-end">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea 
                {...form.register('notes')}
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Additional notes or payment terms..."
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    type="number"
                    {...form.register('discount', { valueAsNumber: true })}
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="tax">Tax (%)</Label>
                  <Input 
                    type="number"
                    {...form.register('tax', { valueAsNumber: true })}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>AED {subtotal.toFixed(2)}</span>
                </div>
                {watchedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({watchedDiscount}%):</span>
                    <span>-AED {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {watchedTax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({watchedTax}%):</span>
                    <span>AED {taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>AED {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Invoice
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
