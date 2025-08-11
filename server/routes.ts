import type { Express } from "express";
import { createServer, type Server } from "http";
import { getStorage } from "./storage";
import { insertCustomerSchema, insertLicenseSchema } from "@shared/schema";
import { z } from "zod";

const createCustomerLicenseSchema = z.object({
  p_clinic_name: z.string(),
  p_contact_email: z.string().email(),
  p_contact_phone: z.string().optional(),
  p_address: z.string().optional(),
  p_license_type: z.enum(['trial', 'premium']),
  p_duration_days: z.number().optional(),
});

const validateLicenseSchema = z.object({
  input_license_key: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // License management API routes
  
  // Create customer license (replaces Supabase RPC)
  app.post("/api/rpc/create_customer_license", async (req, res) => {
    try {
      const validatedData = createCustomerLicenseSchema.parse(req.body);
      
      const storage = await getStorage();
      const result = await storage.createCustomerLicense({
        clinic_name: validatedData.p_clinic_name,
        contact_email: validatedData.p_contact_email,
        contact_phone: validatedData.p_contact_phone,
        address: validatedData.p_address,
        license_type: validatedData.p_license_type,
        duration_days: validatedData.p_duration_days,
      });

      res.json([result]);
    } catch (error) {
      console.error("Error creating customer license:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Get all licenses (replaces Supabase RPC)
  app.get("/api/rpc/get_all_licenses", async (req, res) => {
    try {
      const storage = await getStorage();
      const licenses = await storage.getAllLicenses();
      
      // Transform to match Supabase format
      const transformed = licenses.map(license => ({
        license_id: license.id,
        customer_name: license.customer.clinic_name,
        contact_email: license.customer.contact_email,
        license_key: license.license_key,
        license_type: license.license_type,
        status: license.status,
        expires_at: license.expires_at,
        max_users: license.max_users,
        max_patients: license.max_patients,
        created_at: license.created_at,
      }));

      res.json(transformed);
    } catch (error) {
      console.error("Error fetching licenses:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Validate license (replaces Supabase RPC)
  app.post("/api/rpc/validate_license", async (req, res) => {
    try {
      const validatedData = validateLicenseSchema.parse(req.body);
      
      const storage = await getStorage();
      const result = await storage.validateLicense(validatedData.input_license_key);
      
      if (!result) {
        return res.json([{
          is_valid: false,
          customer_name: '',
          license_type: '',
          status: 'not_found',
          expires_at: null,
          features: {}
        }]);
      }

      res.json([result]);
    } catch (error) {
      console.error("Error validating license:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
