
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import { usePrescriptionSettings } from '@/hooks/usePrescriptionSettings';
import { useToast } from '@/hooks/use-toast';

export const PrescriptionSettingsSection: React.FC = () => {
  const { prescriptionSettings, updatePrescriptionSettings } = usePrescriptionSettings();
  const { toast } = useToast();

  const [prescriptionForm, setPrescriptionForm] = useState({
    header: prescriptionSettings.header,
    footer: prescriptionSettings.footer,
    showLogo: prescriptionSettings.showLogo,
    fontSize: prescriptionSettings.fontSize
  });

  const handlePrescriptionSettingsSave = () => {
    updatePrescriptionSettings(prescriptionForm);
    toast({
      title: "Success",
      description: "Prescription settings updated successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Prescription Settings
        </CardTitle>
        <CardDescription>Customize prescription header and footer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Prescription Header</Label>
            <Textarea
              value={prescriptionForm.header}
              onChange={(e) => setPrescriptionForm({...prescriptionForm, header: e.target.value})}
              placeholder="Enter custom header text for prescriptions"
              rows={3}
            />
          </div>
          
          <div>
            <Label>Prescription Footer</Label>
            <Textarea
              value={prescriptionForm.footer}
              onChange={(e) => setPrescriptionForm({...prescriptionForm, footer: e.target.value})}
              placeholder="Enter custom footer text for prescriptions"
              rows={3}
            />
          </div>
          
          <div>
            <Label>Font Size</Label>
            <Select 
              value={prescriptionForm.fontSize} 
              onValueChange={(value) => setPrescriptionForm({...prescriptionForm, fontSize: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handlePrescriptionSettingsSave}>
            Save Prescription Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
