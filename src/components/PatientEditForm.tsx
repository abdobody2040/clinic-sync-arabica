
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone is required'),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalHistory: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface Patient {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
  medications?: string;
  medicalHistory?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

interface PatientEditFormProps {
  patient: Patient;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

export const PatientEditForm: React.FC<PatientEditFormProps> = ({ patient, onSubmit, onCancel }) => {
  // Split the patient name into first and last name
  const nameParts = patient.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName,
      lastName,
      email: patient.email || '',
      phone: patient.phone || '',
      dateOfBirth: patient.dateOfBirth || '',
      gender: patient.gender || '',
      address: patient.address || '',
      emergencyContact: patient.emergencyContact || '',
      emergencyPhone: patient.emergencyPhone || '',
      bloodType: patient.bloodType || '',
      allergies: patient.allergies || '',
      medications: patient.medications || '',
      medicalHistory: patient.medicalHistory || '',
      insuranceProvider: patient.insuranceProvider || '',
      insuranceNumber: patient.insuranceNumber || '',
    }
  });

  const handleSubmit = (data: PatientFormData) => {
    console.log('Updating patient data:', data);
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Patient</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input {...form.register('firstName')} />
            {form.formState.errors.firstName && (
              <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input {...form.register('lastName')} />
            {form.formState.errors.lastName && (
              <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input type="email" {...form.register('email')} />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input {...form.register('phone')} />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input type="date" {...form.register('dateOfBirth')} />
            {form.formState.errors.dateOfBirth && (
              <p className="text-sm text-red-500">{form.formState.errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="gender">Gender *</Label>
            <Select onValueChange={(value) => form.setValue('gender', value)} defaultValue={patient.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.gender && (
              <p className="text-sm text-red-500">{form.formState.errors.gender.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Address *</Label>
            <Input {...form.register('address')} />
            {form.formState.errors.address && (
              <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact *</Label>
            <Input {...form.register('emergencyContact')} />
            {form.formState.errors.emergencyContact && (
              <p className="text-sm text-red-500">{form.formState.errors.emergencyContact.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
            <Input {...form.register('emergencyPhone')} />
            {form.formState.errors.emergencyPhone && (
              <p className="text-sm text-red-500">{form.formState.errors.emergencyPhone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bloodType">Blood Type</Label>
            <Select onValueChange={(value) => form.setValue('bloodType', value)} defaultValue={patient.bloodType}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Input {...form.register('insuranceProvider')} />
          </div>

          <div>
            <Label htmlFor="insuranceNumber">Insurance Number</Label>
            <Input {...form.register('insuranceNumber')} />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea {...form.register('allergies')} placeholder="List any known allergies..." />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea {...form.register('medications')} placeholder="List current medications..." />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea {...form.register('medicalHistory')} placeholder="Past medical history, surgeries, conditions..." />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Update Patient
        </Button>
      </div>
    </form>
  );
};
