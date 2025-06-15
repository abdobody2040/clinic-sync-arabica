
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, Settings, Stethoscope, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [licenseStatus, setLicenseStatus] = useState("checking");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [licenseKey, setLicenseKey] = useState("");
  const { toast } = useToast();

  // Mock authentication check
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
      setCurrentUser({ name: "Dr. Ahmed", role: "admin", email: "admin@test.com" });
      setLicenseStatus("active");
    } else {
      // Check if license is already activated
      const license = localStorage.getItem("clinic_license");
      if (license) {
        setLicenseStatus("active");
      } else {
        setLicenseStatus("expired");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login
    if (loginForm.email === "admin@test.com" && loginForm.password === "password123") {
      localStorage.setItem("auth_token", "demo_token");
      setIsAuthenticated(true);
      setCurrentUser({ name: "Dr. Ahmed", role: "admin", email: "admin@test.com" });
      toast({
        title: "Login Successful",
        description: "Welcome to Clinic Management System",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use admin@test.com / password123",
        variant: "destructive",
      });
    }
  };

  const handleLicenseActivation = () => {
    if (licenseKey === "DEMO-TRIAL-2024-ABCD") {
      localStorage.setItem("clinic_license", licenseKey);
      setLicenseStatus("active");
      toast({
        title: "License Activated",
        description: "Your clinic license has been successfully activated!",
      });
    } else {
      toast({
        title: "Invalid License",
        description: "Please enter a valid license key. Demo: DEMO-TRIAL-2024-ABCD",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
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
            <CardTitle className="text-2xl">Clinic Management System</CardTitle>
            <CardDescription>Enter your license key to activate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="license">License Key</Label>
              <Input
                id="license"
                placeholder="Enter license key"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
              />
            </div>
            <Button onClick={handleLicenseActivation} className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Activate License
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              Demo License: <code className="bg-muted px-2 py-1 rounded">DEMO-TRIAL-2024-ABCD</code>
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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your clinic account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Demo Login: <code className="bg-muted px-2 py-1 rounded">admin@test.com / password123</code>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Clinic Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Shield className="w-3 h-3 mr-1" />
                Licensed
              </Badge>
              <span className="text-sm text-gray-600">Welcome, {currentUser?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Settings className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">System Status</p>
                    <p className="text-2xl font-bold text-green-600">Online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="patients" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Management</CardTitle>
                  <CardDescription>View and manage patient records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Input placeholder="Search patients..." className="max-w-sm" />
                      <Button>Add New Patient</Button>
                    </div>
                    <div className="border rounded-lg">
                      <table className="w-full">
                        <thead className="border-b bg-gray-50">
                          <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Phone</th>
                            <th className="text-left p-4">Last Visit</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4">Ahmed Al-Mansouri</td>
                            <td className="p-4">+971 50 123 4567</td>
                            <td className="p-4">2024-01-15</td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Fatima Hassan</td>
                            <td className="p-4">+971 55 987 6543</td>
                            <td className="p-4">2024-01-14</td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Scheduling</CardTitle>
                  <CardDescription>Manage clinic appointments and schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline">Today</Button>
                        <Button variant="outline">Week</Button>
                        <Button variant="outline">Month</Button>
                      </div>
                      <Button>New Appointment</Button>
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
                            <Badge>Confirmed</Badge>
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
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Invoices</CardTitle>
                  <CardDescription>Manage invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Input placeholder="Search invoices..." className="max-w-sm" />
                      <Button>Create Invoice</Button>
                    </div>
                    <div className="border rounded-lg">
                      <table className="w-full">
                        <thead className="border-b bg-gray-50">
                          <tr>
                            <th className="text-left p-4">Invoice #</th>
                            <th className="text-left p-4">Patient</th>
                            <th className="text-left p-4">Amount</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4">#INV-001</td>
                            <td className="p-4">Ahmed Al-Mansouri</td>
                            <td className="p-4">AED 350.00</td>
                            <td className="p-4">
                              <Badge variant="secondary">Paid</Badge>
                            </td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">#INV-002</td>
                            <td className="p-4">Fatima Hassan</td>
                            <td className="p-4">AED 200.00</td>
                            <td className="p-4">
                              <Badge variant="destructive">Pending</Badge>
                            </td>
                            <td className="p-4">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure clinic settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Clinic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Clinic Name</Label>
                          <Input defaultValue="Al-Shifa Medical Center" />
                        </div>
                        <div>
                          <Label>License Number</Label>
                          <Input defaultValue="DEMO-TRIAL-2024-ABCD" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Language Settings</h3>
                      <div className="mt-4">
                        <Label>Default Language</Label>
                        <div className="flex space-x-4 mt-2">
                          <Button variant="outline">English</Button>
                          <Button variant="outline">العربية</Button>
                        </div>
                      </div>
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
