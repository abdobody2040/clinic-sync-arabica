
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
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

interface MainTabsProps {
  // Patient-related props
  showPatientForm: boolean;
  viewMode: string;
  selectedPatient: Patient | null;
  patients: Patient[];
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
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="patients" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="patients">{t("patients")}</TabsTrigger>
        <TabsTrigger value="appointments">{t("appointments")}</TabsTrigger>
        <TabsTrigger value="billing">{t("billing")}</TabsTrigger>
        <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
        <TabsTrigger value="inventory">{t("inventory")}</TabsTrigger>
        <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
      </TabsList>

      <TabsContent value="patients">
        <PatientsTab
          showPatientForm={props.showPatientForm}
          viewMode={props.viewMode}
          selectedPatient={props.selectedPatient}
          patients={props.patients}
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

      <TabsContent value="appointments">
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

      <TabsContent value="billing">
        <BillingTab
          showInvoiceForm={props.showInvoiceForm}
          onCreateInvoice={props.onCreateInvoice}
          onInvoiceSubmit={props.onInvoiceSubmit}
          onCancelInvoiceForm={props.onCancelInvoiceForm}
        />
      </TabsContent>

      <TabsContent value="reports">
        <ReportsGenerator />
      </TabsContent>

      <TabsContent value="inventory">
        <InventoryManager />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};
