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

interface MedicalRecord {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  type: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface Prescription {
  id: number;
  patientId: number;
  patientName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'discontinued';
  prescribedBy: string;
}

interface LabResult {
  id: number;
  patientId: number;
  patientName: string;
  testName: string;
  testDate: string;
  result: string;
  normalRange: string;
  status: 'completed' | 'pending' | 'in-progress';
  orderedBy: string;
}

export const usePatients = () => {
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Ahmed Al-Mansouri", phone: "+971 50 123 4567", lastVisit: "2024-01-15" },
    { id: 2, name: "Fatima Hassan", phone: "+971 55 987 6543", lastVisit: "2024-01-14" }
  ]);

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: 1,
      patientId: 1,
      patientName: "Ahmed Al-Mansouri",
      date: "2024-01-15",
      type: "General Consultation",
      diagnosis: "Hypertension",
      treatment: "Lifestyle changes, medication",
      notes: "Patient advised to reduce salt intake"
    },
    {
      id: 2,
      patientId: 1,
      patientName: "Ahmed Al-Mansouri",
      date: "2024-01-10",
      type: "Follow-up",
      diagnosis: "Diabetes Type 2",
      treatment: "Metformin adjustment",
      notes: "Blood sugar levels improving"
    },
    {
      id: 3,
      patientId: 2,
      patientName: "Fatima Hassan",
      date: "2024-01-14",
      type: "Annual Checkup",
      diagnosis: "Healthy",
      treatment: "Preventive care",
      notes: "All vitals normal"
    }
  ]);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      patientId: 1,
      patientName: "Ahmed Al-Mansouri",
      medicationName: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      status: "active",
      prescribedBy: "Dr. Ahmed"
    },
    {
      id: 2,
      patientId: 1,
      patientName: "Ahmed Al-Mansouri",
      medicationName: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2024-01-10",
      endDate: "2024-07-10",
      status: "active",
      prescribedBy: "Dr. Ahmed"
    },
    {
      id: 3,
      patientId: 2,
      patientName: "Fatima Hassan",
      medicationName: "Vitamin D3",
      dosage: "1000IU",
      frequency: "Once daily",
      startDate: "2024-01-14",
      endDate: "2024-04-14",
      status: "active",
      prescribedBy: "Dr. Ahmed"
    }
  ]);

  const [labResults, setLabResults] = useState<LabResult[]>([
    {
      id: 1,
      patientId: 1,
      patientName: "Ahmed Al-Mansouri",
      testName: "Blood Glucose",
      testDate: "2024-01-15",
      result: "145 mg/dL",
      normalRange: "70-140 mg/dL",
      status: "completed",
      orderedBy: "Dr. Ahmed"
    },
    {
      id: 2,
      patientId: 1,
      patientName: "Ahmed Al-Mansouri",
      testName: "HbA1c",
      testDate: "2024-01-15",
      result: "7.2%",
      normalRange: "<7%",
      status: "completed",
      orderedBy: "Dr. Ahmed"
    },
    {
      id: 3,
      patientId: 2,
      patientName: "Fatima Hassan",
      testName: "Complete Blood Count",
      testDate: "2024-01-16",
      result: "",
      normalRange: "Various",
      status: "pending",
      orderedBy: "Dr. Ahmed"
    },
    {
      id: 4,
      patientId: 2,
      patientName: "Fatima Hassan",
      testName: "Lipid Panel",
      testDate: "2024-01-16",
      result: "",
      normalRange: "Various",
      status: "pending",
      orderedBy: "Dr. Ahmed"
    }
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
    medicalRecords,
    prescriptions,
    labResults,
    handleAddNewPatient,
    handlePatientSubmit,
    handleViewPatient,
    handleEditPatient,
    handlePatientUpdate,
    handleClosePatientView,
    handleEditFromView
  };
};
