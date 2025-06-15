
export type Language = 'en' | 'ar';

export interface Translations {
  // Auth & Navigation
  welcome: string;
  welcomeBack: string;
  signIn: string;
  signInToAccount: string;
  email: string;
  password: string;
  logout: string;
  demoLogin: string;
  
  // License
  licenseActivation: string;
  enterLicenseKey: string;
  licenseKey: string;
  activateLicense: string;
  demoLicense: string;
  licensed: string;
  
  // System
  clinicManagementSystem: string;
  systemStatus: string;
  online: string;
  loading: string;
  error: string;
  success: string;
  save: string;
  view: string;
  edit: string;
  update: string;
  name: string;
  phone: string;
  status: string;
  actions: string;
  
  // Dashboard
  totalPatients: string;
  todaysAppointments: string;
  pendingInvoices: string;
  
  // Patients
  patients: string;
  patientManagement: string;
  viewManagePatients: string;
  searchPatients: string;
  addNewPatient: string;
  medicalRecords: string;
  prescriptions: string;
  labResults: string;
  records: string;
  active: string;
  pending: string;
  lastVisit: string;
  
  // Appointments
  appointments: string;
  appointmentScheduling: string;
  manageAppointments: string;
  newAppointment: string;
  confirmed: string;
  completed: string;
  today: string;
  week: string;
  month: string;
  
  // Billing
  billing: string;
  billingInvoices: string;
  manageInvoices: string;
  searchInvoices: string;
  createInvoice: string;
  invoiceNumber: string;
  patient: string;
  amount: string;
  paid: string;
  
  // Reports
  reports: string;
  reportsAnalytics: string;
  generateReports: string;
  patientReports: string;
  financialReports: string;
  appointmentReports: string;
  
  // Inventory
  inventory: string;
  inventoryManagement: string;
  manageSupplies: string;
  supplies: string;
  equipment: string;
  lowStock: string;
  
  // Settings
  settings: string;
  systemSettings: string;
  configureSettings: string;
  clinicInformation: string;
  clinicName: string;
  licenseNumber: string;
  languageSettings: string;
  defaultLanguage: string;
}

export type TranslationKey = keyof Translations;

export const translations: Record<Language, Translations> = {
  en: {
    // Auth & Navigation
    welcome: "Welcome",
    welcomeBack: "Welcome Back",
    signIn: "Sign In",
    signInToAccount: "Sign in to your account",
    email: "Email",
    password: "Password",
    logout: "Logout",
    demoLogin: "Demo Login",
    
    // License
    licenseActivation: "License Activation",
    enterLicenseKey: "Enter your license key to activate the system",
    licenseKey: "License Key",
    activateLicense: "Activate License",
    demoLicense: "Demo License",
    licensed: "Licensed",
    
    // System
    clinicManagementSystem: "Clinic Management System",
    systemStatus: "System Status",
    online: "Online",
    loading: "Loading",
    error: "Error",
    success: "Success",
    save: "Save",
    view: "View",
    edit: "Edit",
    update: "Update",
    name: "Name",
    phone: "Phone",
    status: "Status",
    actions: "Actions",
    
    // Dashboard
    totalPatients: "Total Patients",
    todaysAppointments: "Today's Appointments",
    pendingInvoices: "Pending Invoices",
    
    // Patients
    patients: "Patients",
    patientManagement: "Patient Management",
    viewManagePatients: "View and manage patient records",
    searchPatients: "Search patients...",
    addNewPatient: "Add New Patient",
    medicalRecords: "Medical Records",
    prescriptions: "Prescriptions",
    labResults: "Lab Results",
    records: "records",
    active: "active",
    pending: "pending",
    lastVisit: "Last Visit",
    
    // Appointments
    appointments: "Appointments",
    appointmentScheduling: "Appointment Scheduling",
    manageAppointments: "Manage patient appointments",
    newAppointment: "New Appointment",
    confirmed: "Confirmed",
    completed: "Completed",
    today: "Today",
    week: "Week",
    month: "Month",
    
    // Billing
    billing: "Billing",
    billingInvoices: "Billing & Invoices",
    manageInvoices: "Manage billing and invoices",
    searchInvoices: "Search invoices...",
    createInvoice: "Create Invoice",
    invoiceNumber: "Invoice #",
    patient: "Patient",
    amount: "Amount",
    paid: "Paid",
    
    // Reports
    reports: "Reports",
    reportsAnalytics: "Reports & Analytics",
    generateReports: "Generate clinic reports",
    patientReports: "Patient Reports",
    financialReports: "Financial Reports",
    appointmentReports: "Appointment Reports",
    
    // Inventory
    inventory: "Inventory",
    inventoryManagement: "Inventory Management",
    manageSupplies: "Manage medical supplies and equipment",
    supplies: "Supplies",
    equipment: "Equipment",
    lowStock: "Low Stock",
    
    // Settings
    settings: "Settings",
    systemSettings: "System Settings",
    configureSettings: "Configure system settings",
    clinicInformation: "Clinic Information",
    clinicName: "Clinic Name",
    licenseNumber: "License Number",
    languageSettings: "Language Settings",
    defaultLanguage: "Default Language",
  },
  ar: {
    // Auth & Navigation
    welcome: "مرحباً",
    welcomeBack: "مرحباً بعودتك",
    signIn: "تسجيل الدخول",
    signInToAccount: "سجل دخولك إلى حسابك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    logout: "تسجيل الخروج",
    demoLogin: "تسجيل دخول تجريبي",
    
    // License
    licenseActivation: "تفعيل الترخيص",
    enterLicenseKey: "أدخل مفتاح الترخيص لتفعيل النظام",
    licenseKey: "مفتاح الترخيص",
    activateLicense: "تفعيل الترخيص",
    demoLicense: "ترخيص تجريبي",
    licensed: "مرخص",
    
    // System
    clinicManagementSystem: "نظام إدارة العيادة",
    systemStatus: "حالة النظام",
    online: "متصل",
    loading: "جاري التحميل",
    error: "خطأ",
    success: "نجح",
    save: "حفظ",
    view: "عرض",
    edit: "تعديل",
    update: "تحديث",
    name: "الاسم",
    phone: "الهاتف",
    status: "الحالة",
    actions: "الإجراءات",
    
    // Dashboard
    totalPatients: "إجمالي المرضى",
    todaysAppointments: "مواعيد اليوم",
    pendingInvoices: "الفواتير المعلقة",
    
    // Patients
    patients: "المرضى",
    patientManagement: "إدارة المرضى",
    viewManagePatients: "عرض وإدارة سجلات المرضى",
    searchPatients: "البحث عن المرضى...",
    addNewPatient: "إضافة مريض جديد",
    medicalRecords: "السجلات الطبية",
    prescriptions: "الوصفات الطبية",
    labResults: "نتائج المختبر",
    records: "سجلات",
    active: "نشط",
    pending: "معلق",
    lastVisit: "آخر زيارة",
    
    // Appointments
    appointments: "المواعيد",
    appointmentScheduling: "جدولة المواعيد",
    manageAppointments: "إدارة مواعيد المرضى",
    newAppointment: "موعد جديد",
    confirmed: "مؤكد",
    completed: "مكتمل",
    today: "اليوم",
    week: "الأسبوع",
    month: "الشهر",
    
    // Billing
    billing: "الفواتير",
    billingInvoices: "الفواتير والمحاسبة",
    manageInvoices: "إدارة الفواتير والمحاسبة",
    searchInvoices: "البحث في الفواتير...",
    createInvoice: "إنشاء فاتورة",
    invoiceNumber: "رقم الفاتورة",
    patient: "المريض",
    amount: "المبلغ",
    paid: "مدفوع",
    
    // Reports
    reports: "التقارير",
    reportsAnalytics: "التقارير والتحليلات",
    generateReports: "إنشاء تقارير العيادة",
    patientReports: "تقارير المرضى",
    financialReports: "التقارير المالية",
    appointmentReports: "تقارير المواعيد",
    
    // Inventory
    inventory: "المخزون",
    inventoryManagement: "إدارة المخزون",
    manageSupplies: "إدارة المستلزمات الطبية والمعدات",
    supplies: "المستلزمات",
    equipment: "المعدات",
    lowStock: "مخزون منخفض",
    
    // Settings
    settings: "الإعدادات",
    systemSettings: "إعدادات النظام",
    configureSettings: "تكوين إعدادات النظام",
    clinicInformation: "معلومات العيادة",
    clinicName: "اسم العيادة",
    licenseNumber: "رقم الترخيص",
    languageSettings: "إعدادات اللغة",
    defaultLanguage: "اللغة الافتراضية",
  },
};
