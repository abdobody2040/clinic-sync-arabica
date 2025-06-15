
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

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

export const usePatients = () => {
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Ahmed Al-Mansouri", phone: "+971 50 123 4567", lastVisit: "2024-01-15" },
    { id: 2, name: "Fatima Hassan", phone: "+971 55 987 6543", lastVisit: "2024-01-14" }
  ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewMode, setViewMode] = useState('list');
  
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAddNewPatient = () => {
    console.log("Add New Patient button clicked");
    setShowPatientForm(true);
  };

  const handlePatientSubmit = (data: any) => {
    console.log("Patient form submitted:", data);
    
    const newPatient = {
      id: patients.length + 1,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      lastVisit: new Date().toISOString().split('T')[0],
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      emergencyContact: data.emergencyContact,
      emergencyPhone: data.emergencyPhone,
      bloodType: data.bloodType,
      allergies: data.allergies,
      medications: data.medications,
      medicalHistory: data.medicalHistory,
      insuranceProvider: data.insuranceProvider,
      insuranceNumber: data.insuranceNumber
    };
    
    setPatients(prevPatients => [...prevPatients, newPatient]);
    setShowPatientForm(false);
    
    console.log("Patient added successfully:", newPatient);
    
    toast({
      title: t("success"),
      description: "Patient added successfully!",
    });
  };

  const handleViewPatient = (patientName: string) => {
    console.log("View patient clicked for:", patientName);
    const patient = patients.find(p => p.name === patientName);
    if (patient) {
      setSelectedPatient(patient);
      setViewMode('view');
    }
  };

  const handleEditPatient = (patientName: string) => {
    console.log("Edit patient clicked for:", patientName);
    const patient = patients.find(p => p.name === patientName);
    if (patient) {
      setSelectedPatient(patient);
      setViewMode('edit');
    }
  };

  const handlePatientUpdate = (data: any) => {
    console.log("Patient update submitted:", data);
    
    if (selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        bloodType: data.bloodType,
        allergies: data.allergies,
        medications: data.medications,
        medicalHistory: data.medicalHistory,
        insuranceProvider: data.insuranceProvider,
        insuranceNumber: data.insuranceNumber
      };
      
      setPatients(prevPatients => 
        prevPatients.map(patient => 
          patient.id === selectedPatient.id ? updatedPatient : patient
        )
      );
      
      setViewMode('list');
      setSelectedPatient(null);
      
      toast({
        title: t("success"),
        description: "Patient updated successfully!",
      });
    }
  };

  const handleClosePatientView = () => {
    setViewMode('list');
    setSelectedPatient(null);
  };

  const handleEditFromView = () => {
    setViewMode('edit');
  };

  return {
    showPatientForm,
    setShowPatientForm,
    patients,
    selectedPatient,
    viewMode,
    handleAddNewPatient,
    handlePatientSubmit,
    handleViewPatient,
    handleEditPatient,
    handlePatientUpdate,
    handleClosePatientView,
    handleEditFromView
  };
};
