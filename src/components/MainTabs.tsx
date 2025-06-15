
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PatientsTab } from './tabs/PatientsTab';
import { AppointmentsTab } from './tabs/AppointmentsTab';
import { BillingTab } from './tabs/BillingTab';
import { SettingsTab } from './tabs/SettingsTab';
import { ReportsGenerator } from './ReportsGenerator';
import { InventoryManager } from './InventoryManager';

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

interface MainTabsProps {
  activeTab: string;
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

export const MainTabs: React.FC<MainTabsProps> = (props) => {
  return (
    <Tabs value={props.activeTab} className="space-y-4 sm:space-y-6">
      <TabsContent value="patients" className="space-y-4">
        <PatientsTab
          showPatientForm={props.showPatientForm}
          viewMode={props.viewMode}
          selectedPatient={props.selectedPatient}
          patients={props.patients}
          medicalRecords={props.medicalRecords || []}
          prescriptions={props.prescriptions || []}
          labResults={props.labResults || []}
          onAddNewPatient={props.onAddNewPatient}
          onPatientSubmit={props.onPatientSubmit}
          onCancelPatientForm={props.onCancelPatientForm}
          onViewPatient={props.onViewPatient}
          onEditPatient={props.onEditPatient}
          onPatientUpdate={props.onPatientUpdate}
          onClosePatientView={props.onClosePatientView}
          onEditFromView={props.onEditFromView}
        />
      </TabsContent>

      <TabsContent value="appointments" className="space-y-4">
        <AppointmentsTab
          showAppointmentForm={props.showAppointmentForm}
          selectedAppointment={props.selectedAppointment}
          appointments={props.appointments}
          onNewAppointment={props.onNewAppointment}
          onAppointmentSubmit={props.onAppointmentSubmit}
          onCancelAppointmentForm={props.onCancelAppointmentForm}
          onEditAppointment={props.onEditAppointment}
          onDeleteAppointment={props.onDeleteAppointment}
        />
      </TabsContent>

      <TabsContent value="billing" className="space-y-4">
        <BillingTab
          showInvoiceForm={props.showInvoiceForm}
          onCreateInvoice={props.onCreateInvoice}
          onInvoiceSubmit={props.onInvoiceSubmit}
          onCancelInvoiceForm={props.onCancelInvoiceForm}
        />
      </TabsContent>

      <TabsContent value="reports" className="space-y-4">
        <ReportsGenerator />
      </TabsContent>

      <TabsContent value="inventory" className="space-y-4">
        <InventoryManager />
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};
