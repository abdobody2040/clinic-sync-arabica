
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UseFormRegister } from 'react-hook-form';

interface PrescriptionFormData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  diagnosis: string;
  generalInstructions: string;
}

interface GeneralInstructionsSectionProps {
  register: UseFormRegister<PrescriptionFormData>;
}

export const GeneralInstructionsSection: React.FC<GeneralInstructionsSectionProps> = ({ register }) => {
  return (
    <div>
      <Label htmlFor="generalInstructions">General Instructions</Label>
      <Textarea
        id="generalInstructions"
        {...register('generalInstructions')}
        placeholder="Enter general instructions for the patient"
        rows={4}
      />
    </div>
  );
};
