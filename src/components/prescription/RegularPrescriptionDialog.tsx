
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRegularPrescriptions } from '@/hooks/useRegularPrescriptions';

interface RegularPrescriptionDialogProps {
  showRegularPrescriptions: boolean;
  setShowRegularPrescriptions: (show: boolean) => void;
  onAddRegularPrescription: (prescription: any) => void;
}

export const RegularPrescriptionDialog: React.FC<RegularPrescriptionDialogProps> = ({
  showRegularPrescriptions,
  setShowRegularPrescriptions,
  onAddRegularPrescription
}) => {
  const { regularPrescriptions } = useRegularPrescriptions();

  const groupedPrescriptions = regularPrescriptions.reduce((acc: any, prescription) => {
    const category = prescription.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prescription);
    return acc;
  }, {});

  return (
    <Dialog open={showRegularPrescriptions} onOpenChange={setShowRegularPrescriptions}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add from Regular
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select from Regular Prescriptions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {Object.keys(groupedPrescriptions).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No regular prescriptions available. Add some in Settings first.
            </div>
          ) : (
            Object.entries(groupedPrescriptions).map(([category, prescriptions]: [string, any]) => (
              <div key={category}>
                <h3 className="font-medium text-lg mb-3 text-blue-600">{category}</h3>
                <div className="grid gap-3">
                  {prescriptions.map((prescription: any) => (
                    <div
                      key={prescription.id}
                      className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => onAddRegularPrescription(prescription)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{prescription.name}</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><strong>Dosage:</strong> {prescription.dosage}</div>
                            <div><strong>Frequency:</strong> {prescription.frequency}</div>
                            {prescription.duration && (
                              <div><strong>Duration:</strong> {prescription.duration}</div>
                            )}
                            {prescription.instructions && (
                              <div><strong>Instructions:</strong> {prescription.instructions}</div>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
