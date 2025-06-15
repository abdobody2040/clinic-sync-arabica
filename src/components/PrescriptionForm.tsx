import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, Printer, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { generatePrescriptionPDF } from '@/utils/pdfGenerator';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useRegularPrescriptions } from '@/hooks/useRegularPrescriptions';
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
  const { regularPrescriptions } = useRegularPrescriptions();
  const [showRegularPrescriptions, setShowRegularPrescriptions] = useState(false);

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

  const groupedPrescriptions = regularPrescriptions.reduce((acc: any, prescription) => {
    const category = prescription.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prescription);
    return acc;
  }, {});

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
              <div className="flex gap-2">
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
                                  onClick={() => addRegularPrescription(prescription)}
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
