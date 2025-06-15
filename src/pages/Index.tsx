import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Dashboard } from "@/components/Dashboard";
import { LicenseScreen } from "@/components/LicenseScreen";
import { LoginScreen } from "@/components/LoginScreen";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [licenseStatus, setLicenseStatus] = useState("checking");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [licenseKey, setLicenseKey] = useState("");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [patients, setPatients] = useState([
    { id: 1, name: "Ahmed Al-Mansouri", phone: "+971 50 123 4567", lastVisit: "2024-01-15" },
    { id: 2, name: "Fatima Hassan", phone: "+971 55 987 6543", lastVisit: "2024-01-14" }
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patientName: "Ahmed Al-Mansouri", 
      appointmentDate: "2024-01-15", 
      appointmentTime: "09:00",
      appointmentType: "consultation",
      duration: "30",
      status: "confirmed",
      notes: "General checkup and consultation"
    },
    { 
      id: 2, 
      patientName: "Fatima Hassan", 
      appointmentDate: "2024-01-15", 
      appointmentTime: "10:00",
      appointmentType: "followup",
      duration: "30",
      status: "completed",
      notes: "Follow-up visit"
    }
  ]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentViewMode, setAppointmentViewMode] = useState('list');
  const { toast } = useToast();
  const { t } = useLanguage();

  console.log("Index component rendered, isAuthenticated:", isAuthenticated);
  console.log("License status:", licenseStatus);

  // Mock authentication check
  useEffect(() => {
    console.log("useEffect running for auth check");
    const token = localStorage.getItem("auth_token");
    if (token) {
      console.log("Found auth token, setting authenticated");
      setIsAuthenticated(true);
      setCurrentUser({ name: "Dr. Ahmed", role: "admin", email: "admin@test.com" });
      setLicenseStatus("active");
    } else {
      // Check if license is already activated
      const license = localStorage.getItem("clinic_license");
      if (license) {
        console.log("Found license, setting active");
        setLicenseStatus("active");
      } else {
        console.log("No license found, setting expired");
        setLicenseStatus("expired");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", loginForm.email);
    
    // Demo login
    if (loginForm.email === "admin@test.com" && loginForm.password === "password123") {
      console.log("Login successful");
      localStorage.setItem("auth_token", "demo_token");
      setIsAuthenticated(true);
      setCurrentUser({ name: "Dr. Ahmed", role: "admin", email: "admin@test.com" });
      toast({
        title: t("success"),
        description: t("welcomeBack"),
      });
    } else {
      console.log("Login failed");
      toast({
        title: t("error"),
        description: "Invalid credentials. Use admin@test.com / password123",
        variant: "destructive",
      });
    }
  };

  const handleLicenseActivation = () => {
    console.log("License activation attempted with:", licenseKey);
    if (licenseKey === "DEMO-TRIAL-2024-ABCD") {
      console.log("License activated successfully");
      localStorage.setItem("clinic_license", licenseKey);
      setLicenseStatus("active");
      toast({
        title: t("success"),
        description: "License activated successfully!",
      });
    } else {
      console.log("Invalid license key");
      toast({
        title: t("error"),
        description: "Please enter a valid license key. Demo: DEMO-TRIAL-2024-ABCD",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: t("success"),
      description: "You have been logged out",
    });
  };

  // Updated button click handlers
  const handleAddNewPatient = () => {
    console.log("Add New Patient button clicked");
    setShowPatientForm(true);
  };

  const handleNewAppointment = () => {
    console.log("New Appointment button clicked");
    setShowAppointmentForm(true);
  };

  const handleCreateInvoice = () => {
    console.log("Create Invoice button clicked");
    setShowInvoiceForm(true);
  };

  // Updated form submission handlers
  const handlePatientSubmit = (data: any) => {
    console.log("Patient form submitted:", data);
    
    // Create new patient object
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
    
    // Add to patients list
    setPatients(prevPatients => [...prevPatients, newPatient]);
    setShowPatientForm(false);
    
    console.log("Patient added successfully:", newPatient);
    console.log("Updated patients list:", [...patients, newPatient]);
    
    toast({
      title: t("success"),
      description: "Patient added successfully!",
    });
  };

  const handleAppointmentSubmit = (data: any) => {
    console.log("Appointment form submitted:", data);
    
    if (appointmentViewMode === 'edit' && selectedAppointment) {
      // Update existing appointment
      const updatedAppointment = {
        ...selectedAppointment,
        ...data
      };
      
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment.id === selectedAppointment.id ? updatedAppointment : appointment
        )
      );
      
      setAppointmentViewMode('list');
      setSelectedAppointment(null);
      
      toast({
        title: t("success"),
        description: "Appointment updated successfully!",
      });
    } else {
      // Create new appointment
      const newAppointment = {
        id: appointments.length + 1,
        ...data
      };
      
      setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
      
      toast({
        title: t("success"),
        description: "Appointment scheduled successfully!",
      });
    }
    
    setShowAppointmentForm(false);
  };

  const handleInvoiceSubmit = (data: any) => {
    console.log("Invoice form submitted:", data);
    setShowInvoiceForm(false);
    toast({
      title: t("success"),
      description: "Invoice created successfully!",
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

  const handleEditAppointment = (appointmentId: number) => {
    console.log("Edit appointment clicked for ID:", appointmentId);
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setAppointmentViewMode('edit');
      setShowAppointmentForm(true);
    }
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    console.log("Delete appointment clicked for ID:", appointmentId);
    setAppointments(prevAppointments => 
      prevAppointments.filter(appointment => appointment.id !== appointmentId)
    );
    
    toast({
      title: t("success"),
      description: "Appointment deleted successfully!",
    });
  };

  const handleCancelAppointmentForm = () => {
    setShowAppointmentForm(false);
    setSelectedAppointment(null);
    setAppointmentViewMode('list');
  };

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
      showPatientForm={showPatientForm}
      viewMode={viewMode}
      selectedPatient={selectedPatient}
      patients={patients}
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
