
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Header } from './Header';
import { StatsCards } from './StatsCards';
import { MainTabs } from './MainTabs';

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

interface Appointment {
  id: number;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  status: string;
  notes: string;
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

interface DashboardProps {
  currentUser: { name: string; role: string; email: string } | null;
  onLogout: () => void;
  
  // Tab-related props
  activeTab: string;
  onTabChange: (tab: string) => void;
  
  // Patient-related props
  showPatientForm: boolean;
  viewMode: string;
  selectedPatient: Patient | null;
  patients: Patient[];
  medicalRecords?: MedicalRecord[];
  prescriptions?: Prescription[];
  labResults?: LabResult[];
  onAddNewPatient: () => void;
  onPatientSubmit: (data: any) => void;
  onCancelPatientForm: () => void;
  onViewPatient: (patientName: string) => void;
  onEditPatient: (patientName: string) => void;
  onPatientUpdate: (data: any) => void;
  onClosePatientView: () => void;
  onEditFromView: () => void;
  
  // Appointment-related props
  showAppointmentForm: boolean;
  selectedAppointment: Appointment | null;
  appointments: Appointment[];
  onNewAppointment: () => void;
  onAppointmentSubmit: (data: any) => void;
  onCancelAppointmentForm: () => void;
  onEditAppointment: (appointmentId: number) => void;
  onDeleteAppointment: (appointmentId: number) => void;
  
  // Billing-related props
  showInvoiceForm: boolean;
  onCreateInvoice: () => void;
  onInvoiceSubmit: (data: any) => void;
  onCancelInvoiceForm: () => void;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <Header 
        currentUser={props.currentUser} 
        onLogout={props.onLogout}
        activeTab={props.activeTab}
        onTabChange={props.onTabChange}
      />
      
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          <StatsCards patients={props.patients} appointments={props.appointments} />
          <MainTabs {...props} />
        </div>
      </main>
    </div>
  );
};
