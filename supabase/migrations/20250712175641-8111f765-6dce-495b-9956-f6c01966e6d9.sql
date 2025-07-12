
-- Update the license creation function to support only Trial and Premium types
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
  -- Validate license type
  IF p_license_type NOT IN ('trial', 'premium') THEN
    RAISE EXCEPTION 'Invalid license type. Must be trial or premium';
  END IF;

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
  
  -- Calculate expiry date (Premium gets 365 days by default, Trial gets specified days)
  IF p_license_type = 'premium' THEN
    expiry_date := now() + INTERVAL '365 days';
  ELSE
    expiry_date := now() + (p_duration_days || ' days')::INTERVAL;
  END IF;
  
  -- Create license with updated specifications
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
      WHEN 'premium' THEN 20
      ELSE 1
    END,
    CASE p_license_type
      WHEN 'trial' THEN 50
      WHEN 'premium' THEN 10000
      ELSE 50
    END,
    CASE p_license_type
      WHEN 'trial' THEN '{"basic_features": true}'::JSONB
      WHEN 'premium' THEN '{"basic_features": true, "reports": true, "backup": true, "api_access": true, "priority_support": true, "advanced_analytics": true}'::JSONB
      ELSE '{}'::JSONB
    END
  );
  
  RETURN QUERY SELECT new_customer_id, new_license_key, expiry_date;
END;
$$ LANGUAGE plpgsql;

-- Update the license key generation function to use better prefixes
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
    WHEN 'trial' THEN prefix := 'TRL';
    WHEN 'premium' THEN prefix := 'PRO';
    ELSE prefix := 'TRL';
  END CASE;
  
  -- Get current year
  year_part := EXTRACT(YEAR FROM now())::TEXT;
  
  -- Generate random alphanumeric string (10 characters for better uniqueness)
  random_part := UPPER(
    substring(
      encode(gen_random_bytes(8), 'base64')
      from 1 for 10
    )
  );
  
  -- Remove any special characters and ensure only alphanumeric
  random_part := regexp_replace(random_part, '[^A-Z0-9]', '', 'g');
  
  -- If too short after cleaning, pad with random numbers
  WHILE length(random_part) < 10 LOOP
    random_part := random_part || (floor(random() * 10))::TEXT;
  END LOOP;
  
  -- Truncate to 10 characters if longer
  random_part := substring(random_part from 1 for 10);
  
  -- Combine parts: PREFIX-YEAR-RANDOM
  final_key := prefix || '-' || year_part || '-' || random_part;
  
  RETURN final_key;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get all licenses for admin management
CREATE OR REPLACE FUNCTION get_all_licenses()
RETURNS TABLE (
  license_id UUID,
  customer_name TEXT,
  contact_email TEXT,
  license_key TEXT,
  license_type TEXT,
  status TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  max_users INTEGER,
  max_patients INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id as license_id,
    c.clinic_name as customer_name,
    c.contact_email,
    l.license_key,
    l.license_type,
    l.status,
    l.expires_at,
    l.max_users,
    l.max_patients,
    l.created_at
  FROM public.licenses l
  JOIN public.customers c ON l.customer_id = c.id
  ORDER BY l.created_at DESC;
END;
$$ LANGUAGE plpgsql;
