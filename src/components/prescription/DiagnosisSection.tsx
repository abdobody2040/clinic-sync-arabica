
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

interface DiagnosisSectionProps {
  register: UseFormRegister<PrescriptionFormData>;
}

export const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ register }) => {
  return (
    <div>
      <Label htmlFor="diagnosis">Diagnosis</Label>
      <Textarea
        id="diagnosis"
        {...register('diagnosis')}
        placeholder="Enter diagnosis"
        rows={3}
      />
    </div>
  );
};
