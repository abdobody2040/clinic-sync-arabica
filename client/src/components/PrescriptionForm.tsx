
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { generatePrescriptionPDF } from '@/utils/pdfGenerator';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';
import { PatientInfoSection } from '@/components/prescription/PatientInfoSection';
import { DiagnosisSection } from '@/components/prescription/DiagnosisSection';
import { MedicationsSection } from '@/components/prescription/MedicationsSection';
import { GeneralInstructionsSection } from '@/components/prescription/GeneralInstructionsSection';
import { PrescriptionActions } from '@/components/prescription/PrescriptionActions';

interface PrescriptionFormData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  diagnosis: string;
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
      generalInstructions: ''
    }
  });

  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  const { settings } = useAppSettings();
  const { profile } = useUserProfile();
  const { toast } = useToast();
  const [showRegularPrescriptions, setShowRegularPrescriptions] = useState(false);

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
          <PatientInfoSection 
            register={register}
            setValue={setValue}
            selectedPatient={selectedPatient}
          />
          
          <DiagnosisSection register={register} />
          
          <MedicationsSection
            medications={medications}
            setMedications={setMedications}
            showRegularPrescriptions={showRegularPrescriptions}
            setShowRegularPrescriptions={setShowRegularPrescriptions}
          />
          
          <GeneralInstructionsSection register={register} />
          
          <PrescriptionActions
            onCancel={onCancel}
            onPrint={handlePrintPrescription}
          />
        </form>
      </CardContent>
    </Card>
  );
};
