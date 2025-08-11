import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Home, Users, Calendar, FileText, BarChart3, Settings } from "lucide-react";

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
      <main className={`container mx-auto px-4 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="mb-6">
          <StatsCards patients={props.patients} appointments={props.appointments} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-6 lg:grid-cols-6 ${isRTL ? 'rtl-flex-reverse' : ''}`}>
            <TabsTrigger value="dashboard" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t("dashboard")}</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t("patients")}</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t("appointments")}</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t("billing")}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t("reports")}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Settings className="w-4 h-4" />
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



