import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PatientsTab } from './tabs/PatientsTab';
import { AppointmentsTab } from './tabs/AppointmentsTab';
import { BillingTab } from './tabs/BillingTab';
import { SettingsTab } from './tabs/SettingsTab';
import { ReportsGenerator } from './ReportsGenerator';
import { InventoryManager } from './InventoryManager';
import { useAuth } from "../hooks/useAuth";
import { useLicense } from "../hooks/useLicense";
import { useLanguage } from "../hooks/useLanguage";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import StatsCards from "./StatsCards";
import { Home } from "lucide-react"; // Assuming Home icon is needed for the dashboard tab

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

  // Prescription-related props
  showPrescriptionForm?: boolean;
  onWritePrescription?: (patient: Patient) => void;
  onPrescriptionSubmit?: (data: any) => void;
  onCancelPrescriptionForm?: () => void;

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
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();
  const { licenseStatus } = useLicense();
  const { isRTL, t } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <Header />
      <main className={`container mx-auto px-4 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="mb-6">
          <StatsCards />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-6 lg:grid-cols-6 ${isRTL ? 'rtl-flex-reverse' : ''}`}>
            <TabsTrigger value="dashboard" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t("dashboard")}</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <PatientsTabLogo className="w-4 h-4" /> {/* Assuming a PatientsTabLogo component exists */}
              <span className="hidden sm:inline">{t("patients")}</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <AppointmentsTabLogo className="w-4 h-4" /> {/* Assuming an AppointmentsTabLogo component exists */}
              <span className="hidden sm:inline">{t("appointments")}</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <BillingTabLogo className="w-4 h-4" /> {/* Assuming a BillingTabLogo component exists */}
              <span className="hidden sm:inline">{t("billing")}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ReportsTabLogo className="w-4 h-4" /> {/* Assuming a ReportsTabLogo component exists */}
              <span className="hidden sm:inline">{t("reports")}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <SettingsTabLogo className="w-4 h-4" /> {/* Assuming a SettingsTabLogo component exists */}
              <span className="hidden sm:inline">{t("settings")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            {/* Dashboard content would go here */}
            <div>Dashboard Content</div>
          </TabsContent>

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
              showPrescriptionForm={props.showPrescriptionForm}
              onWritePrescription={props.onWritePrescription}
              onPrescriptionSubmit={props.onPrescriptionSubmit}
              onCancelPrescriptionForm={props.onCancelPrescriptionForm}
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
      </main>
    </div>
  );
};

// Placeholder components for icons, assuming they exist in your project
const PatientsTabLogo = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path><circle cx="12" cy="12" r="5"></circle></svg>;
const AppointmentsTabLogo = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 22H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const BillingTabLogo = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l4-2 4 2 4-2 4 2V2l-4 2-4-2-4 2-4-2z"></path><path d="M12 10v4l2 1"></path></svg>;
const ReportsTabLogo = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 9v6l4-3l4 3V9"></path></svg>;
const SettingsTabLogo = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 6.6 15 1.65 1.65 0 0 0 5.5 16v-.09A1.65 1.65 0 0 0 4.6 15H4a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9 1.65 1.65 0 0 0 4.34 7.18l.06-.06a2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 6.6V6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z"></path></svg>;

// Mock Header component, replace with your actual Header if it exists
const Header = () => (
  <header className="bg-white shadow-md p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-xl font-bold">App Logo</div>
      {/* Other header elements */}
    </div>
  </header>
);