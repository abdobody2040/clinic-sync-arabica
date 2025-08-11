
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Pill, Plus, Edit, Trash2 } from 'lucide-react';
import { useRegularPrescriptions, RegularPrescription } from '@/hooks/useRegularPrescriptions';
import { useToast } from '@/hooks/use-toast';

export const RegularPrescriptionsSection: React.FC = () => {
  const { regularPrescriptions, addRegularPrescription, updateRegularPrescription, deleteRegularPrescription } = useRegularPrescriptions();
  const { toast } = useToast();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<RegularPrescription | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    category: ''
  });

  const categories = ['Pain Relief', 'Antibiotic', 'Anti-inflammatory', 'Cardiovascular', 'Diabetes', 'Respiratory', 'Other'];

  const handleAdd = () => {
    if (!formData.name || !formData.dosage || !formData.frequency) {
      toast({
        title: "Error",
        description: "Please fill in required fields (name, dosage, frequency)",
        variant: "destructive"
      });
      return;
    }

    addRegularPrescription(formData);
    setFormData({ name: '', dosage: '', frequency: '', duration: '', instructions: '', category: '' });
    setShowAddDialog(false);
    
    toast({
      title: "Success",
      description: "Regular prescription added successfully!"
    });
  };

  const handleEdit = (prescription: RegularPrescription) => {
    setEditingPrescription(prescription);
    setFormData({
      name: prescription.name,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      instructions: prescription.instructions,
      category: prescription.category
    });
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    if (!editingPrescription) return;
    
    updateRegularPrescription(editingPrescription.id, formData);
    setShowEditDialog(false);
    setEditingPrescription(null);
    setFormData({ name: '', dosage: '', frequency: '', duration: '', instructions: '', category: '' });
    
    toast({
      title: "Success",
      description: "Regular prescription updated successfully!"
    });
  };

  const handleDelete = (id: number) => {
    deleteRegularPrescription(id);
    toast({
      title: "Success",
      description: "Regular prescription deleted successfully!"
    });
  };

  const resetForm = () => {
    setFormData({ name: '', dosage: '', frequency: '', duration: '', instructions: '', category: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="w-5 h-5 mr-2" />
          Regular Prescriptions
        </CardTitle>
        <CardDescription>Manage frequently prescribed medications for quick access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Add common medications to quickly include them in prescriptions
            </p>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Regular Prescription</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Medication Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter medication name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Dosage *</Label>
                      <Input
                        value={formData.dosage}
                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div>
                      <Label>Frequency *</Label>
                      <Input
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        placeholder="e.g., Twice daily"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 7 days"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
                  </div>
                  <div>
                    <Label>Instructions</Label>
                    <Textarea
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      placeholder="e.g., Take with food"
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAdd}>
                      Add Prescription
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-3">
            {regularPrescriptions.map((prescription) => (
              <div key={prescription.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{prescription.name}</h4>
                      {prescription.category && (
                        <Badge variant="secondary" className="text-xs">
                          {prescription.category}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div><strong>Dosage:</strong> {prescription.dosage}</div>
                      <div><strong>Frequency:</strong> {prescription.frequency}</div>
                      {prescription.duration && (
                        <div><strong>Duration:</strong> {prescription.duration}</div>
                      )}
                      {prescription.instructions && (
                        <div className="col-span-2"><strong>Instructions:</strong> {prescription.instructions}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(prescription)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(prescription.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {regularPrescriptions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No regular prescriptions added yet. Click "Add Prescription" to get started.
              </div>
            )}
          </div>
        </div>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Regular Prescription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Medication Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter medication name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Dosage *</Label>
                  <Input
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <Label>Frequency *</Label>
                  <Input
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    placeholder="e.g., Twice daily"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 7 days"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
              </div>
              <div>
                <Label>Instructions</Label>
                <Textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="e.g., Take with food"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>
                  Update Prescription
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
