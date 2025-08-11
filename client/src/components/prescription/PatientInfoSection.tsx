
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface PrescriptionFormData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  diagnosis: string;
  generalInstructions: string;
}

interface PatientInfoSectionProps {
  register: UseFormRegister<PrescriptionFormData>;
  setValue: UseFormSetValue<PrescriptionFormData>;
  selectedPatient?: any;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({
  register,
  setValue,
  selectedPatient
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          {...register('patientName', { required: true })}
          placeholder="Enter patient name"
        />
      </div>
      <div>
        <Label htmlFor="patientAge">Age</Label>
        <Input
          id="patientAge"
          {...register('patientAge')}
          placeholder="Enter age"
        />
      </div>
      <div>
        <Label htmlFor="patientGender">Gender</Label>
        <Select onValueChange={(value) => setValue('patientGender', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
