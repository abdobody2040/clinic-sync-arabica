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

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [licenseStatus, setLicenseStatus] = useState("checking");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [licenseKey, setLicenseKey] = useState("");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
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

  // Added missing form submission handlers
  const handlePatientSubmit = (data: any) => {
    console.log("Patient form submitted:", data);
    setShowPatientForm(false);
    toast({
      title: t("success"),
      description: "Patient added successfully!",
    });
  };

  const handleAppointmentSubmit = (data: any) => {
    console.log("Appointment form submitted:", data);
    setShowAppointmentForm(false);
    toast({
      title: t("success"),
      description: "Appointment scheduled successfully!",
    });
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
    toast({
      title: "View Patient",
      description: `Viewing details for ${patientName}`,
    });
  };

  const handleEditPatient = (patientName: string) => {
    console.log("Edit patient clicked for:", patientName);
    toast({
      title: "Edit Patient",
      description: `Editing details for ${patientName}`,
    });
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
                            <tr className="border-b">
                              <td className="p-4">Ahmed Al-Mansouri</td>
                              <td className="p-4">+971 50 123 4567</td>
                              <td className="p-4">2024-01-15</td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => handleViewPatient("Ahmed Al-Mansouri")}>{t("view")}</Button>
                                  <Button variant="outline" size="sm" onClick={() => handleEditPatient("Ahmed Al-Mansouri")}>{t("edit")}</Button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-4">Fatima Hassan</td>
                              <td className="p-4">+971 55 987 6543</td>
                              <td className="p-4">2024-01-14</td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => handleViewPatient("Fatima Hassan")}>{t("view")}</Button>
                                  <Button variant="outline" size="sm" onClick={() => handleEditPatient("Fatima Hassan")}>{t("edit")}</Button>
                                </div>
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

            <TabsContent value="appointments">
              {showAppointmentForm ? (
                <AppointmentForm 
                  onSubmit={handleAppointmentSubmit}
                  onCancel={() => setShowAppointmentForm(false)}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Ahmed Al-Mansouri</p>
                                <p className="text-sm text-gray-600">General Checkup</p>
                                <p className="text-sm text-gray-500">09:00 AM - 09:30 AM</p>
                              </div>
                              <Badge>{t("confirmed")}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Fatima Hassan</p>
                                <p className="text-sm text-gray-600">Follow-up</p>
                                <p className="text-sm text-gray-500">10:00 AM - 10:30 AM</p>
                              </div>
                              <Badge variant="secondary">{t("completed")}</Badge>
                            </div>
                          </CardContent>
                        </Card>
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
