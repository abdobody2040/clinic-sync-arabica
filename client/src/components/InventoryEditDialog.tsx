
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unitPrice: number;
  supplier: string;
  expiryDate?: string;
  location: string;
}

interface InventoryEditDialogProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
  categories: string[];
}

export const InventoryEditDialog: React.FC<InventoryEditDialogProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  categories
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [editedItem, setEditedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);

  const handleSave = () => {
    if (!editedItem || !editedItem.name || !editedItem.category) {
      toast({
        title: t("error"),
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSave(editedItem);
    onClose();
    
    toast({
      title: t("success"),
      description: "Item updated successfully!",
    });
  };

  if (!editedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("edit")} Inventory Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Item Name *</Label>
            <Input 
              value={editedItem.name}
              onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
              placeholder="Enter item name"
            />
          </div>

          <div>
            <Label>Category *</Label>
            <Select 
              value={editedItem.category}
              onValueChange={(value) => setEditedItem(prev => prev ? ({ ...prev, category: value }) : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Stock</Label>
              <Input 
                type="number"
                value={editedItem.stock}
                onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, stock: parseInt(e.target.value) || 0 }) : null)}
              />
            </div>
            <div>
              <Label>Min Stock</Label>
              <Input 
                type="number"
                value={editedItem.minStock}
                onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, minStock: parseInt(e.target.value) || 0 }) : null)}
              />
            </div>
          </div>

          <div>
            <Label>Unit Price</Label>
            <Input 
              type="number"
              step="0.01"
              value={editedItem.unitPrice}
              onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }) : null)}
            />
          </div>

          <div>
            <Label>Supplier</Label>
            <Input 
              value={editedItem.supplier}
              onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, supplier: e.target.value }) : null)}
              placeholder="Supplier name"
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input 
              value={editedItem.location}
              onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, location: e.target.value }) : null)}
              placeholder="Storage location"
            />
          </div>

          <div>
            <Label>Expiry Date (optional)</Label>
            <Input 
              type="date"
              value={editedItem.expiryDate || ''}
              onChange={(e) => setEditedItem(prev => prev ? ({ ...prev, expiryDate: e.target.value }) : null)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSave}>
              {t("save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
