
-- Create a table for customers/clinics
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_name TEXT NOT NULL,
  contact_email TEXT NOT NULL UNIQUE,
  contact_phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for licenses
CREATE TABLE public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  license_key TEXT NOT NULL UNIQUE,
  license_type TEXT NOT NULL DEFAULT 'trial', -- trial, standard, premium
  status TEXT NOT NULL DEFAULT 'active', -- active, expired, suspended
  expires_at TIMESTAMP WITH TIME ZONE,
  max_users INTEGER DEFAULT 1,
  max_patients INTEGER DEFAULT 100,
  features JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for customers (admin access only for now)
CREATE POLICY "Admin can manage customers" ON public.customers
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' = 'admin@test.com');

-- Create RLS policies for licenses (admin access only for now)
CREATE POLICY "Admin can manage licenses" ON public.licenses
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' = 'admin@test.com');

-- Create a function to generate unique license keys
CREATE OR REPLACE FUNCTION generate_license_key(license_type TEXT DEFAULT 'trial')
RETURNS TEXT AS $$
DECLARE
  prefix TEXT;
  random_part TEXT;
  year_part TEXT;
  final_key TEXT;
BEGIN
  -- Set prefix based on license type
  CASE license_type
    WHEN 'trial' THEN prefix := 'TRIAL';
    WHEN 'standard' THEN prefix := 'STD';
    WHEN 'premium' THEN prefix := 'PRO';
    ELSE prefix := 'DEMO';
  END CASE;
  
  -- Get current year
  year_part := EXTRACT(YEAR FROM now())::TEXT;
  
  -- Generate random alphanumeric string (8 characters)
  random_part := UPPER(
    substring(
      encode(gen_random_bytes(6), 'base64')
      from 1 for 8
    )
  );
  
  -- Remove any special characters and ensure only alphanumeric
  random_part := regexp_replace(random_part, '[^A-Z0-9]', '', 'g');
  
  -- If too short after cleaning, pad with random numbers
  WHILE length(random_part) < 8 LOOP
    random_part := random_part || (floor(random() * 10))::TEXT;
  END LOOP;
  
  -- Truncate to 8 characters if longer
  random_part := substring(random_part from 1 for 8);
  
  -- Combine parts: PREFIX-YEAR-RANDOM
  final_key := prefix || '-' || year_part || '-' || random_part;
  
  RETURN final_key;
END;
$$ LANGUAGE plpgsql;

-- Create a function to create a new license
CREATE OR REPLACE FUNCTION create_customer_license(
  p_clinic_name TEXT,
  p_contact_email TEXT,
  p_contact_phone TEXT DEFAULT NULL,
  p_address TEXT DEFAULT NULL,
  p_license_type TEXT DEFAULT 'trial',
  p_duration_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  customer_id UUID,
  license_key TEXT,
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  new_customer_id UUID;
  new_license_key TEXT;
  expiry_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Create customer first
  INSERT INTO public.customers (clinic_name, contact_email, contact_phone, address)
  VALUES (p_clinic_name, p_contact_email, p_contact_phone, p_address)
  RETURNING id INTO new_customer_id;
  
  -- Generate unique license key
  LOOP
    new_license_key := generate_license_key(p_license_type);
    -- Check if key already exists
    IF NOT EXISTS (SELECT 1 FROM public.licenses l WHERE l.license_key = new_license_key) THEN
      EXIT;
    END IF;
  END LOOP;
  
  -- Calculate expiry date
  expiry_date := now() + (p_duration_days || ' days')::INTERVAL;
  
  -- Create license
  INSERT INTO public.licenses (
    customer_id, 
    license_key, 
    license_type, 
    expires_at,
    max_users,
    max_patients,
    features
  ) VALUES (
    new_customer_id,
    new_license_key,
    p_license_type,
    expiry_date,
    CASE p_license_type
      WHEN 'trial' THEN 1
      WHEN 'standard' THEN 5
      WHEN 'premium' THEN 20
      ELSE 1
    END,
    CASE p_license_type
      WHEN 'trial' THEN 50
      WHEN 'standard' THEN 500
      WHEN 'premium' THEN 10000
      ELSE 50
    END,
    CASE p_license_type
      WHEN 'trial' THEN '{"basic_features": true}'::JSONB
      WHEN 'standard' THEN '{"basic_features": true, "reports": true, "backup": true}'::JSONB
      WHEN 'premium' THEN '{"basic_features": true, "reports": true, "backup": true, "api_access": true, "priority_support": true}'::JSONB
      ELSE '{}'::JSONB
    END
  );
  
  RETURN QUERY SELECT new_customer_id, new_license_key, expiry_date;
END;
$$ LANGUAGE plpgsql;

-- Create a function to validate license
CREATE OR REPLACE FUNCTION validate_license(input_license_key TEXT)
RETURNS TABLE (
  is_valid BOOLEAN,
  customer_name TEXT,
  license_type TEXT,
  status TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  features JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN l.status = 'active' AND (l.expires_at IS NULL OR l.expires_at > now()) THEN true
      ELSE false
    END as is_valid,
    c.clinic_name as customer_name,
    l.license_type,
    l.status,
    l.expires_at,
    l.features
  FROM public.licenses l
  JOIN public.customers c ON l.customer_id = c.id
  WHERE l.license_key = input_license_key;
  
  -- If no record found, return default values
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, ''::TEXT, ''::TEXT, 'not_found'::TEXT, null::TIMESTAMP WITH TIME ZONE, '{}'::JSONB;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert some demo data
SELECT create_customer_license(
  'Demo Clinic',
  'demo@clinic.com',
  '+971 50 123 4567',
  'Dubai Healthcare City',
  'trial',
  30
);
