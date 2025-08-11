import { users, customers, licenses, type User, type InsertUser, type Customer, type InsertCustomer, type License, type InsertLicense } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Customer operations
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  getAllCustomers(): Promise<Customer[]>;
  
  // License operations
  createLicense(license: InsertLicense): Promise<License>;
  getLicenseByKey(licenseKey: string): Promise<License | undefined>;
  getAllLicenses(): Promise<Array<License & { customer: Customer }>>;
  validateLicense(licenseKey: string): Promise<{
    is_valid: boolean;
    customer_name: string;
    license_type: string;
    status: string;
    expires_at: string | null;
    features: any;
  } | null>;
  createCustomerLicense(params: {
    clinic_name: string;
    contact_email: string;
    contact_phone?: string;
    address?: string;
    license_type: string;
    duration_days?: number;
  }): Promise<{
    customer_id: string;
    license_key: string;
    expires_at: string;
  }>;
}

import { db } from "./db";
import { eq, and, gte } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const result = await db.insert(customers).values(customer).returning();
    return result[0];
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const result = await db.select().from(customers).where(eq(customers.contact_email, email)).limit(1);
    return result[0];
  }

  async createLicense(license: InsertLicense): Promise<License> {
    const result = await db.insert(licenses).values(license).returning();
    return result[0];
  }

  async getLicenseByKey(licenseKey: string): Promise<License | undefined> {
    const result = await db.select().from(licenses).where(eq(licenses.license_key, licenseKey)).limit(1);
    return result[0];
  }

  async getAllLicenses(): Promise<Array<License & { customer: Customer }>> {
    const result = await db.select({
      id: licenses.id,
      customer_id: licenses.customer_id,
      license_key: licenses.license_key,
      license_type: licenses.license_type,
      status: licenses.status,
      expires_at: licenses.expires_at,
      max_users: licenses.max_users,
      max_patients: licenses.max_patients,
      features: licenses.features,
      created_at: licenses.created_at,
      updated_at: licenses.updated_at,
      customer: {
        id: customers.id,
        clinic_name: customers.clinic_name,
        contact_email: customers.contact_email,
        contact_phone: customers.contact_phone,
        address: customers.address,
        created_at: customers.created_at,
        updated_at: customers.updated_at,
      }
    })
    .from(licenses)
    .leftJoin(customers, eq(licenses.customer_id, customers.id))
    .orderBy(licenses.created_at);
    
    return result.map(row => ({
      ...row,
      customer: row.customer!
    }));
  }

  async validateLicense(licenseKey: string): Promise<{
    is_valid: boolean;
    customer_name: string;
    license_type: string;
    status: string;
    expires_at: string | null;
    features: any;
  } | null> {
    const result = await db.select({
      license_type: licenses.license_type,
      status: licenses.status,
      expires_at: licenses.expires_at,
      features: licenses.features,
      customer_name: customers.clinic_name,
    })
    .from(licenses)
    .leftJoin(customers, eq(licenses.customer_id, customers.id))
    .where(eq(licenses.license_key, licenseKey))
    .limit(1);

    if (!result[0]) {
      return {
        is_valid: false,
        customer_name: '',
        license_type: '',
        status: 'not_found',
        expires_at: null,
        features: {}
      };
    }

    const license = result[0];
    const isActive = license.status === 'active';
    const isNotExpired = !license.expires_at || new Date(license.expires_at) > new Date();
    
    return {
      is_valid: isActive && isNotExpired,
      customer_name: license.customer_name || '',
      license_type: license.license_type,
      status: license.status,
      expires_at: license.expires_at ? license.expires_at.toISOString() : null,
      features: license.features || {}
    };
  }

  private generateLicenseKey(licenseType: string): string {
    const prefix = licenseType === 'trial' ? 'TRL' : 'PRO';
    const year = new Date().getFullYear();
    const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase();
    return `${prefix}-${year}-${randomPart}`;
  }

  async createCustomerLicense(params: {
    clinic_name: string;
    contact_email: string;
    contact_phone?: string;
    address?: string;
    license_type: string;
    duration_days?: number;
  }): Promise<{
    customer_id: string;
    license_key: string;
    expires_at: string;
  }> {
    // Create customer first
    const customer = await this.createCustomer({
      clinic_name: params.clinic_name,
      contact_email: params.contact_email,
      contact_phone: params.contact_phone || null,
      address: params.address || null,
    });

    // Generate unique license key
    let licenseKey: string;
    let isUnique = false;
    do {
      licenseKey = this.generateLicenseKey(params.license_type);
      const existing = await this.getLicenseByKey(licenseKey);
      isUnique = !existing;
    } while (!isUnique);

    // Calculate expiry date
    const durationDays = params.license_type === 'premium' ? 365 : (params.duration_days || 30);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    // Determine features and limits based on license type
    const maxUsers = params.license_type === 'trial' ? 1 : 20;
    const maxPatients = params.license_type === 'trial' ? 50 : 10000;
    const features = params.license_type === 'trial' 
      ? { basic_features: true }
      : { 
          basic_features: true, 
          reports: true, 
          backup: true, 
          api_access: true, 
          priority_support: true, 
          advanced_analytics: true 
        };

    // Create license
    const license = await this.createLicense({
      customer_id: customer.id,
      license_key: licenseKey,
      license_type: params.license_type,
      status: 'active',
      expires_at: expiresAt,
      max_users: maxUsers,
      max_patients: maxPatients,
      features: features,
    });

    return {
      customer_id: customer.id,
      license_key: license.license_key,
      expires_at: expiresAt.toISOString(),
    };
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private customers: Map<string, Customer>;
  private licensesList: Array<License & { customer: Customer }>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.licensesList = [];
    this.currentId = 1;
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private async initializeDemoData() {
    // Create demo customer and license
    const demoCustomer = await this.createCustomer({
      clinic_name: 'Demo Clinic',
      contact_email: 'demo@clinic.com',
      contact_phone: '+971 50 123 4567',
      address: 'Dubai Healthcare City',
    });

    const demoLicense = await this.createLicense({
      customer_id: demoCustomer.id,
      license_key: 'TRL-2025-DEMO1234',
      license_type: 'trial',
      status: 'active',
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      max_users: 1,
      max_patients: 50,
      features: { basic_features: true },
    });

    // Add to licenses list with customer info
    this.licensesList.push({
      ...demoLicense,
      customer: demoCustomer
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newCustomer: Customer = {
      id,
      clinic_name: customer.clinic_name,
      contact_email: customer.contact_email,
      contact_phone: customer.contact_phone || null,
      address: customer.address || null,
      created_at: now,
      updated_at: now,
    };
    this.customers.set(id, newCustomer);
    return newCustomer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.contact_email === email,
    );
  }

  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async createLicense(license: InsertLicense): Promise<License> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newLicense: License = {
      id,
      customer_id: license.customer_id,
      license_key: license.license_key,
      license_type: license.license_type || 'trial',
      status: license.status || 'active',
      expires_at: license.expires_at || null,
      max_users: license.max_users || null,
      max_patients: license.max_patients || null,
      features: license.features || {},
      created_at: now,
      updated_at: now,
    };
    return newLicense;
  }

  async getLicenseByKey(licenseKey: string): Promise<License | undefined> {
    return this.licensesList.find((item) => item.license_key === licenseKey);
  }

  async getAllLicenses(): Promise<Array<License & { customer: Customer }>> {
    return [...this.licensesList];
  }

  async validateLicense(licenseKey: string): Promise<{
    is_valid: boolean;
    customer_name: string;
    license_type: string;
    status: string;
    expires_at: string | null;
    features: any;
  } | null> {
    const licenseItem = this.licensesList.find(item => item.license_key === licenseKey);
    
    if (!licenseItem) {
      return {
        is_valid: false,
        customer_name: '',
        license_type: '',
        status: 'not_found',
        expires_at: null,
        features: {}
      };
    }

    const isActive = licenseItem.status === 'active';
    const isNotExpired = !licenseItem.expires_at || new Date(licenseItem.expires_at) > new Date();
    
    return {
      is_valid: isActive && isNotExpired,
      customer_name: licenseItem.customer.clinic_name,
      license_type: licenseItem.license_type,
      status: licenseItem.status,
      expires_at: licenseItem.expires_at ? licenseItem.expires_at.toISOString() : null,
      features: licenseItem.features || {}
    };
  }

  private generateLicenseKey(licenseType: string): string {
    const prefix = licenseType === 'trial' ? 'TRL' : 'PRO';
    const year = new Date().getFullYear();
    const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase();
    return `${prefix}-${year}-${randomPart}`;
  }

  async createCustomerLicense(params: {
    clinic_name: string;
    contact_email: string;
    contact_phone?: string;
    address?: string;
    license_type: string;
    duration_days?: number;
  }): Promise<{
    customer_id: string;
    license_key: string;
    expires_at: string;
  }> {
    // Create customer first
    const customer = await this.createCustomer({
      clinic_name: params.clinic_name,
      contact_email: params.contact_email,
      contact_phone: params.contact_phone || null,
      address: params.address || null,
    });

    // Generate unique license key
    let licenseKey: string;
    let isUnique = false;
    do {
      licenseKey = this.generateLicenseKey(params.license_type);
      const existing = await this.getLicenseByKey(licenseKey);
      isUnique = !existing;
    } while (!isUnique);

    // Calculate expiry date
    const durationDays = params.license_type === 'premium' ? 365 : (params.duration_days || 30);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    // Determine features and limits based on license type
    const maxUsers = params.license_type === 'trial' ? 1 : 20;
    const maxPatients = params.license_type === 'trial' ? 50 : 10000;
    const features = params.license_type === 'trial' 
      ? { basic_features: true }
      : { 
          basic_features: true, 
          reports: true, 
          backup: true, 
          api_access: true, 
          priority_support: true, 
          advanced_analytics: true 
        };

    // Create license
    const license = await this.createLicense({
      customer_id: customer.id,
      license_key: licenseKey,
      license_type: params.license_type,
      status: 'active',
      expires_at: expiresAt,
      max_users: maxUsers,
      max_patients: maxPatients,
      features: features,
    });

    // Add to licenses list with customer info
    this.licensesList.push({
      ...license,
      customer
    });

    return {
      customer_id: customer.id,
      license_key: license.license_key,
      expires_at: expiresAt.toISOString(),
    };
  }
}

// First, let's create a working DatabaseStorage that implements all required methods
class WorkingDatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const result = await db.insert(customers).values(customer).returning();
    return result[0];
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const result = await db.select().from(customers).where(eq(customers.contact_email, email)).limit(1);
    return result[0];
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await db.select().from(customers);
  }

  async createLicense(license: InsertLicense): Promise<License> {
    const result = await db.insert(licenses).values(license).returning();
    return result[0];
  }

  async getLicenseByKey(licenseKey: string): Promise<License | undefined> {
    const result = await db.select().from(licenses).where(eq(licenses.license_key, licenseKey)).limit(1);
    return result[0];
  }

  async getAllLicenses(): Promise<Array<License & { customer: Customer }>> {
    const result = await db.select({
      id: licenses.id,
      customer_id: licenses.customer_id,
      license_key: licenses.license_key,
      license_type: licenses.license_type,
      status: licenses.status,
      expires_at: licenses.expires_at,
      max_users: licenses.max_users,
      max_patients: licenses.max_patients,
      features: licenses.features,
      created_at: licenses.created_at,
      updated_at: licenses.updated_at,
      customer: {
        id: customers.id,
        clinic_name: customers.clinic_name,
        contact_email: customers.contact_email,
        contact_phone: customers.contact_phone,
        address: customers.address,
        created_at: customers.created_at,
        updated_at: customers.updated_at,
      }
    })
    .from(licenses)
    .leftJoin(customers, eq(licenses.customer_id, customers.id))
    .orderBy(licenses.created_at);
    
    return result.map(row => ({
      ...row,
      customer: row.customer!
    }));
  }

  async validateLicense(licenseKey: string): Promise<{
    is_valid: boolean;
    customer_name: string;
    license_type: string;
    status: string;
    expires_at: string | null;
    features: any;
  } | null> {
    const result = await db.select({
      license_type: licenses.license_type,
      status: licenses.status,
      expires_at: licenses.expires_at,
      features: licenses.features,
      customer_name: customers.clinic_name,
    })
    .from(licenses)
    .leftJoin(customers, eq(licenses.customer_id, customers.id))
    .where(eq(licenses.license_key, licenseKey))
    .limit(1);

    if (!result[0]) {
      return {
        is_valid: false,
        customer_name: '',
        license_type: '',
        status: 'not_found',
        expires_at: null,
        features: {}
      };
    }

    const license = result[0];
    const isActive = license.status === 'active';
    const isNotExpired = !license.expires_at || new Date(license.expires_at) > new Date();
    
    return {
      is_valid: isActive && isNotExpired,
      customer_name: license.customer_name || '',
      license_type: license.license_type,
      status: license.status,
      expires_at: license.expires_at ? license.expires_at.toISOString() : null,
      features: license.features || {}
    };
  }

  async createCustomerLicense(params: {
    clinic_name: string;
    contact_email: string;
    contact_phone?: string;
    address?: string;
    license_type: string;
    duration_days?: number;
  }): Promise<{
    customer_id: string;
    license_key: string;
    expires_at: string;
  }> {
    // Create customer first
    const customer = await this.createCustomer({
      clinic_name: params.clinic_name,
      contact_email: params.contact_email,
      contact_phone: params.contact_phone || null,
      address: params.address || null,
    });

    // Generate unique license key
    const generateLicenseKey = (licenseType: string): string => {
      const prefix = licenseType === 'trial' ? 'TRL' : 'PRO';
      const year = new Date().getFullYear();
      const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase();
      return `${prefix}-${year}-${randomPart}`;
    };

    let licenseKey: string;
    let isUnique = false;
    do {
      licenseKey = generateLicenseKey(params.license_type);
      const existing = await this.getLicenseByKey(licenseKey);
      isUnique = !existing;
    } while (!isUnique);

    // Calculate expiry date
    const durationDays = params.license_type === 'premium' ? 365 : (params.duration_days || 30);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    // Determine features and limits based on license type
    const { maxUsers, maxPatients, features } = params.license_type === 'premium' 
      ? { 
          maxUsers: null, 
          maxPatients: null, 
          features: { 
            basic_features: true, 
            advanced_reports: true, 
            backup: true, 
            api_access: true, 
            priority_support: true, 
            advanced_analytics: true 
          } 
        }
      : { 
          maxUsers: 1, 
          maxPatients: 50, 
          features: { 
            basic_features: true 
          } 
        };

    // Create license
    const license = await this.createLicense({
      customer_id: customer.id,
      license_key: licenseKey,
      license_type: params.license_type,
      status: 'active',
      expires_at: expiresAt,
      max_users: maxUsers,
      max_patients: maxPatients,
      features: features,
    });

    return {
      customer_id: customer.id,
      license_key: license.license_key,
      expires_at: expiresAt.toISOString(),
    };
  }
}

// Initialize storage with database - force database usage
const initializeStorage = async (): Promise<IStorage> => {
  try {
    console.log('Attempting to connect to database...');
    const dbStorage = new WorkingDatabaseStorage();
    
    // Test the connection by trying to get customers
    try {
      const customers = await dbStorage.getAllCustomers();
      console.log('Database connected successfully, found', customers.length, 'customers');
      
      // If no demo data exists, create it
      if (customers.length === 0) {
        console.log('No demo data found, creating demo customer and license...');
        
        const demoCustomer = await dbStorage.createCustomer({
          clinic_name: 'Demo Clinic',
          contact_email: 'demo@clinic.com',
          contact_phone: '+971 50 123 4567',
          address: 'Dubai Healthcare City',
        });

        await dbStorage.createLicense({
          customer_id: demoCustomer.id,
          license_key: 'TRL-2025-DEMO1234',
          license_type: 'trial',
          status: 'active',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          max_users: 1,
          max_patients: 50,
          features: { basic_features: true },
        });
        
        console.log('Demo data created successfully');
      }
      
      console.log('Using DatabaseStorage for persistent data');
      return dbStorage;
    } catch (dbError) {
      console.warn('Database operations failed, falling back to memory storage:', dbError);
      console.log('Using MemStorage (data will not persist between restarts)');
      return new MemStorage();
    }
  } catch (error) {
    console.warn('Database connection completely failed, using memory storage:', error);
    console.log('Using MemStorage (data will not persist between restarts)');
    return new MemStorage();
  }
};

// Initialize storage asynchronously
let storage: IStorage;
const storagePromise = initializeStorage().then(s => {
  storage = s;
  return s;
});

// Export a function that ensures storage is initialized
export const getStorage = async (): Promise<IStorage> => {
  if (!storage) {
    storage = await storagePromise;
  }
  return storage;
};

// For backwards compatibility, export storage directly (will be undefined initially)
export { storage };
