
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { LicenseScreen } from "@/components/LicenseScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { useAuth } from "@/hooks/useAuth";
import { usePatients } from "@/hooks/usePatients";
import { useAppointments } from "@/hooks/useAppointments";
import { useInvoices } from "@/hooks/useInvoices";

const Index = () => {
  const [activeTab, setActiveTab] = useState("patients");

  const {
    isAuthenticated,
    currentUser,
    licenseStatus,
    loginForm,
    setLoginForm,
    licenseKey,
    setLicenseKey,
    handleLogin,
    handleLicenseActivation,
    handleLogout
  } = useAuth();

  const {
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
  } = usePatients();

  const {
    showAppointmentForm,
    appointments,
    selectedAppointment,
    appointmentViewMode,
    handleNewAppointment,
    handleAppointmentSubmit,
    handleEditAppointment,
    handleDeleteAppointment,
    handleCancelAppointmentForm
  } = useAppointments();

  const {
    showInvoiceForm,
    setShowInvoiceForm,
    handleCreateInvoice,
    handleInvoiceSubmit
  } = useInvoices();

  console.log("Index component rendered, isAuthenticated:", isAuthenticated);
  console.log("License status:", licenseStatus);

  // License activation screen
  if (licenseStatus === "expired" || licenseStatus === "checking") {
    return (
      <LicenseScreen
        licenseKey={licenseKey}
        setLicenseKey={setLicenseKey}
        onLicenseActivation={handleLicenseActivation}
      />
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <LoginScreen
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        onLogin={handleLogin}
      />
    );
  }

  // Main dashboard
  return (
    <Dashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showPatientForm={showPatientForm}
      viewMode={viewMode}
      selectedPatient={selectedPatient}
      patients={patients}
      medicalRecords={medicalRecords}
      prescriptions={prescriptions}
      labResults={labResults}
      onAddNewPatient={handleAddNewPatient}
      onPatientSubmit={handlePatientSubmit}
      onCancelPatientForm={() => setShowPatientForm(false)}
      onViewPatient={handleViewPatient}
      onEditPatient={handleEditPatient}
      onPatientUpdate={handlePatientUpdate}
      onClosePatientView={handleClosePatientView}
      onEditFromView={handleEditFromView}
      showAppointmentForm={showAppointmentForm}
      selectedAppointment={selectedAppointment}
      appointments={appointments}
      onNewAppointment={handleNewAppointment}
      onAppointmentSubmit={handleAppointmentSubmit}
      onCancelAppointmentForm={handleCancelAppointmentForm}
      onEditAppointment={handleEditAppointment}
      onDeleteAppointment={handleDeleteAppointment}
      showInvoiceForm={showInvoiceForm}
      onCreateInvoice={handleCreateInvoice}
      onInvoiceSubmit={handleInvoiceSubmit}
      onCancelInvoiceForm={() => setShowInvoiceForm(false)}
    />
  );
};

export default Index;
