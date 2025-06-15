
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PrescriptionActionsProps {
  onCancel: () => void;
  onPrint: () => void;
}

export const PrescriptionActions: React.FC<PrescriptionActionsProps> = ({
  onCancel,
  onPrint
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-end">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" onClick={onPrint} variant="outline">
        <Printer className="w-4 h-4 mr-2" />
        Print/PDF
      </Button>
      <Button type="submit">
        Save Prescription
      </Button>
    </div>
  );
};
