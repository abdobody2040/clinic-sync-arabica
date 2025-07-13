import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useCurrency } from '@/hooks/useCurrency';
import { Package, AlertTriangle, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InventoryEditDialog } from './InventoryEditDialog';

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

export const InventoryManager: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { formatAmount } = useCurrency();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Surgical Gloves',
      category: 'Medical Supplies',
      stock: 45,
      minStock: 20,
      unitPrice: 0.50,
      supplier: 'MedSupply Co.',
      location: 'Storage Room A',
    },
    {
      id: '2',
      name: 'Disposable Syringes',
      category: 'Medical Supplies',
      stock: 150,
      minStock: 50,
      unitPrice: 0.25,
      supplier: 'HealthCare Inc.',
      location: 'Storage Room A',
    },
    {
      id: '3',
      name: 'Blood Pressure Monitor',
      category: 'Equipment',
      stock: 3,
      minStock: 2,
      unitPrice: 150.00,
      supplier: 'MedTech Solutions',
      location: 'Equipment Room',
    },
    {
      id: '4',
      name: 'Paracetamol 500mg',
      category: 'Medications',
      stock: 8,
      minStock: 25,
      unitPrice: 0.10,
      supplier: 'Pharma Direct',
      expiryDate: '2024-12-31',
      location: 'Pharmacy',
    }
  ]);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    category: '',
    stock: 0,
    minStock: 0,
    unitPrice: 0,
    supplier: '',
    expiryDate: '',
    location: '',
  });

  const categories = ['Medical Supplies', 'Equipment', 'Medications', 'Office Supplies'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = items.filter(item => item.stock <= item.minStock);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const item: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name!,
      category: newItem.category!,
      stock: newItem.stock || 0,
      minStock: newItem.minStock || 0,
      unitPrice: newItem.unitPrice || 0,
      supplier: newItem.supplier || '',
      expiryDate: newItem.expiryDate,
      location: newItem.location || '',
    };

    setItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      category: '',
      stock: 0,
      minStock: 0,
      unitPrice: 0,
      supplier: '',
      expiryDate: '',
      location: '',
    });
    setIsDialogOpen(false);
    
    toast({
      title: t("success"),
      description: "Item added to inventory successfully!",
    });
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, stock: newStock } : item
    ));
    
    toast({
      title: t("success"),
      description: "Stock updated successfully!",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: t("success"),
      description: "Item removed from inventory",
    });
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedItem: InventoryItem) => {
    setItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock === 0) return { label: t("outOfStock"), color: 'destructive' };
    if (item.stock <= item.minStock) return { label: t("lowStock"), color: 'secondary' };
    return { label: t("inStock"), color: 'default' };
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("totalItems")}</p>
                <p className="text-2xl font-bold text-gray-900">{items.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("lowStockItems")}</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("categories")}</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("totalValue")}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(items.reduce((sum, item) => sum + (item.stock * item.unitPrice), 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t("inventoryManagement")}</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t("addNewItem")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{t("addNewInventoryItem")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{t("itemName")} *</Label>
                    <Input 
                      value={newItem.name || ''}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t("enterItemName")}
                    />
                  </div>

                  <div>
                    <Label>{t("category")} *</Label>
                    <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCategory")} />
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
                      <Label>{t("currentStock")}</Label>
                      <Input 
                        type="number"
                        value={newItem.stock || 0}
                        onChange={(e) => setNewItem(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label>{t("minStock")}</Label>
                      <Input 
                        type="number"
                        value={newItem.minStock || 0}
                        onChange={(e) => setNewItem(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>{t("unitPrice")}</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={newItem.unitPrice || 0}
                      onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div>
                    <Label>{t("supplier")}</Label>
                    <Input 
                      value={newItem.supplier || ''}
                      onChange={(e) => setNewItem(prev => ({ ...prev, supplier: e.target.value }))}
                      placeholder={t("supplierName")}
                    />
                  </div>

                  <div>
                    <Label>{t("location")}</Label>
                    <Input 
                      value={newItem.location || ''}
                      onChange={(e) => setNewItem(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={t("storageLocation")}
                    />
                  </div>

                  <div>
                    <Label>{t("expiryDate")} ({t("optional")})</Label>
                    <Input 
                      type="date"
                      value={newItem.expiryDate || ''}
                      onChange={(e) => setNewItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={handleAddItem}>
                      {t("addItem")}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Input 
              placeholder={t("searchItems")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allCategories")}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4">{t("item")}</th>
                  <th className="text-left p-4">{t("category")}</th>
                  <th className="text-left p-4">{t("stock")}</th>
                  <th className="text-left p-4">{t("status")}</th>
                  <th className="text-left p-4">{t("unitPrice")}</th>
                  <th className="text-left p-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <tr key={item.id} className="border-b">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.supplier}</p>
                        </div>
                      </td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">
                        <Input 
                          type="number"
                          value={item.stock}
                          onChange={(e) => handleUpdateStock(item.id, parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </td>
                      <td className="p-4">
                        <Badge variant={status.color as any}>{status.label}</Badge>
                      </td>
                      <td className="p-4">{formatAmount(item.unitPrice)}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <InventoryEditDialog
        item={editingItem}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveEdit}
        categories={categories}
      />
    </div>
  );
};
