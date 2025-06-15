
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Printer } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { generatePrescriptionPDF } from '@/utils/pdfGenerator';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

interface PrescriptionFormData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  generalInstructions: string;
}

interface PrescriptionFormProps {
  selectedPatient?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  selectedPatient,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<PrescriptionFormData>({
    defaultValues: {
      patientName: selectedPatient?.name || '',
      patientAge: '',
      patientGender: selectedPatient?.gender || '',
      diagnosis: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      generalInstructions: ''
    }
  });

  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  const { settings } = useAppSettings();
  const { profile } = useUserProfile();
  const { toast } = useToast();

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

  const handleFormSubmit = (data: PrescriptionFormData) => {
    const prescriptionData = {
      ...data,
      medications,
      prescribedBy: profile.name,
      date: new Date().toLocaleDateString(),
      clinicName: settings.clinicName,
      doctorName: profile.name
    };

    onSubmit(prescriptionData);
    toast({
      title: "Success",
      description: "Prescription saved successfully!"
    });
  };

  const handlePrintPrescription = () => {
    const data = {
      patientName: watch('patientName'),
      patientAge: watch('patientAge'),
      patientGender: watch('patientGender'),
      diagnosis: watch('diagnosis'),
      medications,
      generalInstructions: watch('generalInstructions'),
      prescribedBy: profile.name,
      date: new Date().toLocaleDateString(),
      clinicName: settings.clinicName,
      doctorName: profile.name
    };

    generatePrescriptionPDF(data, settings);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Write Prescription
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Patient Information */}
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

          {/* Diagnosis */}
          <div>
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea
              id="diagnosis"
              {...register('diagnosis')}
              placeholder="Enter diagnosis"
              rows={3}
            />
          </div>

          {/* Medications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-semibold">Medications</Label>
              <Button type="button" onClick={addMedication} variant="outline" size="sm">
                Add Medication
              </Button>
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

          {/* General Instructions */}
          <div>
            <Label htmlFor="generalInstructions">General Instructions</Label>
            <Textarea
              id="generalInstructions"
              {...register('generalInstructions')}
              placeholder="Enter general instructions for the patient"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handlePrintPrescription} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print/PDF
            </Button>
            <Button type="submit">
              Save Prescription
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
