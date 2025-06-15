
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
  date: string;
  time: string;
  cancel: string;
  delete: string;
  download: string;
  
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
  currencySettings: string;
  defaultCurrency: string;
  currency: string;
}

export type TranslationKey = keyof Translations;
