
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RegularPrescriptionDialog } from './RegularPrescriptionDialog';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface MedicationsSectionProps {
  medications: Medication[];
  setMedications: (medications: Medication[]) => void;
  showRegularPrescriptions: boolean;
  setShowRegularPrescriptions: (show: boolean) => void;
}

export const MedicationsSection: React.FC<MedicationsSectionProps> = ({
  medications,
  setMedications,
  showRegularPrescriptions,
  setShowRegularPrescriptions
}) => {
  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updated);
  };

  const addRegularPrescription = (regularPrescription: any) => {
    const newMedication = {
      name: regularPrescription.name,
      dosage: regularPrescription.dosage,
      frequency: regularPrescription.frequency,
      duration: regularPrescription.duration,
      instructions: regularPrescription.instructions
    };
    setMedications([...medications, newMedication]);
    setShowRegularPrescriptions(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Label className="text-lg font-semibold">Medications</Label>
        <div className="flex gap-2">
          <RegularPrescriptionDialog
            showRegularPrescriptions={showRegularPrescriptions}
            setShowRegularPrescriptions={setShowRegularPrescriptions}
            onAddRegularPrescription={addRegularPrescription}
          />
          <Button type="button" onClick={addMedication} variant="outline" size="sm">
            Add Medication
          </Button>
        </div>
      </div>
      
      {medications.map((medication, index) => (
        <div key={index} className="border rounded-lg p-4 mb-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Medication {index + 1}</span>
            {medications.length > 1 && (
              <Button
                type="button"
                onClick={() => removeMedication(index)}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Medication Name</Label>
              <Input
                value={medication.name}
                onChange={(e) => updateMedication(index, 'name', e.target.value)}
                placeholder="Enter medication name"
              />
            </div>
            <div>
              <Label>Dosage</Label>
              <Input
                value={medication.dosage}
                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                placeholder="e.g., 500mg"
              />
            </div>
            <div>
              <Label>Frequency</Label>
              <Input
                value={medication.frequency}
                onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                placeholder="e.g., Twice daily"
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                value={medication.duration}
                onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                placeholder="e.g., 7 days"
              />
            </div>
          </div>
          
          <div>
            <Label>Special Instructions</Label>
            <Textarea
              value={medication.instructions}
              onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
              placeholder="e.g., Take with food"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
