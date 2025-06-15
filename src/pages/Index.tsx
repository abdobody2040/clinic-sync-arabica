import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  Stethoscope, 
  Shield, 
  BarChart3, 
  Package,
  Heart,
  Pill,
  FlaskConical,
  Activity,
  AlertTriangle,
  ClipboardList,
  Globe,
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { PatientForm } from "@/components/PatientForm";
import { AppointmentForm } from "@/components/AppointmentForm";
import { InvoiceForm } from "@/components/InvoiceForm";
import { ReportsGenerator } from "@/components/ReportsGenerator";
import { InventoryManager } from "@/components/InventoryManager";
import { PatientDetailsView } from "@/components/PatientDetailsView";
import { PatientEditForm } from "@/components/PatientEditForm";

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
  const [viewMode, setViewMode] = useState('list'); // 'list', 'view', 'edit'
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
  const [appointmentViewMode, setAppointmentViewMode] = useState('list'); // 'list', 'edit'
  const { toast } = useToast();
  const { currentLanguage, changeLanguage, t, isRTL } = useLanguage();

  console.log("Index component rendered, isAuthenticated:", isAuthenticated);
  console.log("License status:", licenseStatus);
  console.log("Current language:", currentLanguage);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{t("clinicManagementSystem")}</CardTitle>
            <CardDescription>{t("enterLicenseKey")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="license">{t("licenseKey")}</Label>
              <Input
                id="license"
                placeholder={t("licenseKey")}
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
              />
            </div>
            <Button onClick={handleLicenseActivation} className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              {t("activateLicense")}
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              {t("demoLicense")}: <code className="bg-muted px-2 py-1 rounded">DEMO-TRIAL-2024-ABCD</code>
            </div>
            
            {/* Language selector */}
            <div className="flex justify-center space-x-2">
              <Button 
                variant={currentLanguage === 'en' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLanguage('en')}
              >
                English
              </Button>
              <Button 
                variant={currentLanguage === 'ar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLanguage('ar')}
              >
                العربية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{t("welcomeBack")}</CardTitle>
            <CardDescription>{t("signInToAccount")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("email")}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("password")}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t("signIn")}
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              {t("demoLogin")}: <code className="bg-muted px-2 py-1 rounded">admin@test.com / password123</code>
            </div>
            
            {/* Language selector */}
            <div className="flex justify-center space-x-2 mt-4">
              <Button 
                variant={currentLanguage === 'en' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLanguage('en')}
              >
                English
              </Button>
              <Button 
                variant={currentLanguage === 'ar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLanguage('ar')}
              >
                العربية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">{t("clinicManagementSystem")}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Shield className="w-3 h-3 mr-1" />
                {t("licensed")}
              </Badge>
              
              {/* Language Selector */}
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-32">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
              
              <span className="text-sm text-gray-600">{t("welcome")}, {currentUser?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                    <p className="text-sm font-medium text-gray-600">{t("totalPatients")}</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                    <p className="text-sm font-medium text-gray-600">{t("todaysAppointments")}</p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                    <p className="text-sm font-medium text-gray-600">{t("pendingInvoices")}</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Settings className="w-8 h-8 text-orange-600" />
                  <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                    <p className="text-sm font-medium text-gray-600">{t("systemStatus")}</p>
                    <p className="text-2xl font-bold text-green-600">{t("online")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
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
              {showPatientForm ? (
                <PatientForm 
                  onSubmit={handlePatientSubmit}
                  onCancel={() => setShowPatientForm(false)}
                />
              ) : viewMode === 'view' && selectedPatient ? (
                <PatientDetailsView
                  patient={selectedPatient}
                  onEdit={handleEditFromView}
                  onClose={handleClosePatientView}
                />
              ) : viewMode === 'edit' && selectedPatient ? (
                <PatientEditForm
                  patient={selectedPatient}
                  onSubmit={handlePatientUpdate}
                  onCancel={handleClosePatientView}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {t("patientManagement")}
                    </CardTitle>
                    <CardDescription>{t("viewManagePatients")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Input placeholder={t("searchPatients")} className="max-w-sm" />
                        <Button onClick={handleAddNewPatient}>{t("addNewPatient")}</Button>
                      </div>
                      
                      {/* Patient Quick Actions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="border-l-4 border-l-red-500">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Heart className="w-6 h-6 text-red-500 mr-3" />
                              <div>
                                <p className="font-medium">{t("medicalRecords")}</p>
                                <p className="text-sm text-gray-600">156 {t("records")}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Pill className="w-6 h-6 text-blue-500 mr-3" />
                              <div>
                                <p className="font-medium">{t("prescriptions")}</p>
                                <p className="text-sm text-gray-600">89 {t("active")}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <FlaskConical className="w-6 h-6 text-green-500 mr-3" />
                              <div>
                                <p className="font-medium">{t("labResults")}</p>
                                <p className="text-sm text-gray-600">23 {t("pending")}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="border rounded-lg">
                        <table className="w-full">
                          <thead className="border-b bg-gray-50">
                            <tr>
                              <th className="text-left p-4">{t("name")}</th>
                              <th className="text-left p-4">{t("phone")}</th>
                              <th className="text-left p-4">{t("lastVisit")}</th>
                              <th className="text-left p-4">{t("actions")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patients.map((patient) => (
                              <tr key={patient.id} className="border-b">
                                <td className="p-4">{patient.name}</td>
                                <td className="p-4">{patient.phone}</td>
                                <td className="p-4">{patient.lastVisit}</td>
                                <td className="p-4">
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient.name)}>{t("view")}</Button>
                                    <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient.name)}>{t("edit")}</Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="appointments">
              {showAppointmentForm ? (
                <AppointmentForm 
                  appointment={selectedAppointment}
                  onSubmit={handleAppointmentSubmit}
                  onCancel={handleCancelAppointmentForm}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      {t("appointmentScheduling")}
                    </CardTitle>
                    <CardDescription>{t("manageAppointments")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button variant="outline">{t("today")}</Button>
                          <Button variant="outline">{t("week")}</Button>
                          <Button variant="outline">{t("month")}</Button>
                        </div>
                        <Button onClick={handleNewAppointment}>{t("newAppointment")}</Button>
                      </div>
                      
                      <div className="border rounded-lg">
                        <table className="w-full">
                          <thead className="border-b bg-gray-50">
                            <tr>
                              <th className="text-left p-4">{t("patient")}</th>
                              <th className="text-left p-4">{t("date")}</th>
                              <th className="text-left p-4">{t("time")}</th>
                              <th className="text-left p-4">Type</th>
                              <th className="text-left p-4">{t("status")}</th>
                              <th className="text-left p-4">{t("actions")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {appointments.map((appointment) => (
                              <tr key={appointment.id} className="border-b">
                                <td className="p-4">{appointment.patientName}</td>
                                <td className="p-4">{appointment.appointmentDate}</td>
                                <td className="p-4">{appointment.appointmentTime}</td>
                                <td className="p-4">{appointment.appointmentType}</td>
                                <td className="p-4">
                                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                    {appointment.status}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => handleEditAppointment(appointment.id)}
                                    >
                                      {t("edit")}
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm" 
                                      onClick={() => handleDeleteAppointment(appointment.id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="billing">
              {showInvoiceForm ? (
                <InvoiceForm 
                  onSubmit={handleInvoiceSubmit}
                  onCancel={() => setShowInvoiceForm(false)}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      {t("billingInvoices")}
                    </CardTitle>
                    <CardDescription>{t("manageInvoices")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Input placeholder={t("searchInvoices")} className="max-w-sm" />
                        <Button onClick={handleCreateInvoice}>{t("createInvoice")}</Button>
                      </div>
                      <div className="border rounded-lg">
                        <table className="w-full">
                          <thead className="border-b bg-gray-50">
                            <tr>
                              <th className="text-left p-4">{t("invoiceNumber")}</th>
                              <th className="text-left p-4">{t("patient")}</th>
                              <th className="text-left p-4">{t("amount")}</th>
                              <th className="text-left p-4">{t("status")}</th>
                              <th className="text-left p-4">{t("actions")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-4">#INV-001</td>
                              <td className="p-4">Ahmed Al-Mansouri</td>
                              <td className="p-4">AED 350.00</td>
                              <td className="p-4">
                                <Badge variant="secondary">{t("paid")}</Badge>
                              </td>
                              <td className="p-4">
                                <Button variant="outline" size="sm">{t("view")}</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reports">
              <ReportsGenerator />
            </TabsContent>

            <TabsContent value="inventory">
              <InventoryManager />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    {t("systemSettings")}
                  </CardTitle>
                  <CardDescription>{t("configureSettings")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">{t("clinicInformation")}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>{t("clinicName")}</Label>
                          <Input defaultValue="Al-Shifa Medical Center" />
                        </div>
                        <div>
                          <Label>{t("licenseNumber")}</Label>
                          <Input defaultValue="DEMO-TRIAL-2024-ABCD" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">{t("languageSettings")}</h3>
                      <div className="mt-4">
                        <Label>{t("defaultLanguage")}</Label>
                        <div className="flex space-x-4 mt-2">
                          <Button 
                            variant={currentLanguage === 'en' ? 'default' : 'outline'}
                            onClick={() => changeLanguage('en')}
                          >
                            English
                          </Button>
                          <Button 
                            variant={currentLanguage === 'ar' ? 'default' : 'outline'}
                            onClick={() => changeLanguage('ar')}
                          >
                            العربية
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>{t("save")} {t("settings")}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
