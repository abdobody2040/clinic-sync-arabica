
# Licensing System Setup Tutorial

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Database Setup](#database-setup)
4. [Backend API Configuration](#backend-api-configuration)
5. [Frontend Components Setup](#frontend-components-setup)
6. [License Generation Process](#license-generation-process)
7. [License Validation Process](#license-validation-process)
8. [Customer Management](#customer-management)
9. [Testing the System](#testing-the-system)
10. [Deployment Configuration](#deployment-configuration)
11. [Advanced Features](#advanced-features)
12. [Troubleshooting](#troubleshooting)

## Overview

This licensing system allows you to generate, manage, and validate software licenses for different customers. It supports two license types:

- **Trial License**: 1 user, 50 patients, 30 days (customizable), basic features
- **Premium License**: 20 users, 10,000 patients, 365 days, full features

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Frontend UI    │    │   Backend API   │    │    Database     │
│                 │    │                 │    │                 │
│ License Manager │◄──►│ License Routes  │◄──►│ Customers Table │
│ License Gen.    │    │ Storage Layer   │    │ Licenses Table  │
│ Validation      │    │ Business Logic  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Database Setup

### 1. Schema Structure

The system uses three main tables:

**Customers Table (`customers`)**
- `id` (UUID, Primary Key)
- `clinic_name` (Text, Required)
- `contact_email` (Text, Required, Unique)
- `contact_phone` (Text, Optional)
- `address` (Text, Optional)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Licenses Table (`licenses`)**
- `id` (UUID, Primary Key)
- `customer_id` (UUID, Foreign Key → customers.id)
- `license_key` (Text, Unique, Required)
- `license_type` (Text, Default: 'trial')
- `status` (Text, Default: 'active')
- `expires_at` (Timestamp, Optional)
- `max_users` (Integer, Default: 1)
- `max_patients` (Integer, Default: 100)
- `features` (JSON, Default: {})
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 2. Database Configuration

The system automatically detects and connects to your database. It supports:
- PostgreSQL (recommended for production)
- In-memory storage (development/testing)

**Database Connection Flow:**
1. System attempts to connect to PostgreSQL database
2. If successful, creates demo data if none exists
3. If connection fails, falls back to in-memory storage

## Backend API Configuration

### 1. Storage Layer (`server/storage.ts`)

The storage layer provides an abstraction between your API and database:

**Key Methods:**
- `createCustomer()` - Creates new customer record
- `createLicense()` - Creates new license record
- `getAllLicenses()` - Retrieves all licenses with customer data
- `validateLicense()` - Validates license key and returns status
- `createCustomerLicense()` - Complete workflow to create customer + license

**License Key Generation:**
- Trial: `TRL-YEAR-RANDOMSTRING` (e.g., TRL-2025-ABCD123456)
- Premium: `PRO-YEAR-RANDOMSTRING` (e.g., PRO-2025-EFGH789012)

### 2. API Endpoints (`server/routes.ts`)

**POST /api/rpc/create_customer_license**
- Creates customer and generates license
- Input: Customer details + license type
- Output: Customer ID, license key, expiry date

**GET /api/rpc/get_all_licenses**
- Retrieves all licenses with customer information
- Output: Array of license objects

**POST /api/rpc/validate_license**
- Validates a license key
- Input: License key
- Output: Validation result with customer info

### 3. Request/Response Examples

**Creating a License:**
```json
POST /api/rpc/create_customer_license
{
  "p_clinic_name": "ABC Clinic",
  "p_contact_email": "admin@abcclinic.com",
  "p_contact_phone": "+971 50 123 4567",
  "p_address": "Dubai Healthcare City",
  "p_license_type": "trial",
  "p_duration_days": 30
}

Response:
[{
  "customer_id": "uuid-here",
  "license_key": "TRL-2025-ABCD123456",
  "expires_at": "2025-02-15T10:30:00Z"
}]
```

**Validating a License:**
```json
POST /api/rpc/validate_license
{
  "input_license_key": "TRL-2025-ABCD123456"
}

Response:
[{
  "is_valid": true,
  "customer_name": "ABC Clinic",
  "license_type": "trial",
  "status": "active",
  "expires_at": "2025-02-15T10:30:00Z",
  "features": { "basic_features": true }
}]
```

## Frontend Components Setup

### 1. License Generator (`LicenseGenerator.tsx`)

**Features:**
- Customer information form
- License type selection (trial/premium)
- Duration configuration for trial licenses
- Real-time license generation
- Copy to clipboard functionality

**Usage:**
1. Fill in customer details (clinic name, email, phone, address)
2. Select license type
3. Set trial duration (if applicable)
4. Click "Generate License"
5. Copy generated license key

### 2. License Manager (`LicenseManager.tsx`)

**Features:**
- View all generated licenses
- Search and filter functionality
- License status monitoring
- Copy license keys
- Export capabilities

**Search Functionality:**
- Search by clinic name
- Search by contact email
- Search by license key
- Real-time filtering

### 3. License Validation

**Integration in Main App:**
```typescript
// In your main application
const { isValid, customerName, features } = useLicense();

if (!isValid) {
  return <LicenseScreen />;
}

// Continue with main app
```

## License Generation Process

### Step-by-Step Generation:

1. **Customer Creation**
   - Validate customer email uniqueness
   - Create customer record in database
   - Generate UUID for customer

2. **License Key Generation**
   - Determine prefix (TRL/PRO) based on license type
   - Generate unique random string
   - Ensure key uniqueness in database
   - Format: `PREFIX-YEAR-RANDOMSTRING`

3. **License Configuration**
   - Set max users/patients based on type
   - Configure features object
   - Calculate expiry date
   - Set status to 'active'

4. **Database Storage**
   - Store license record
   - Link to customer via foreign key
   - Return license details

### Code Example:
```typescript
const result = await storage.createCustomerLicense({
  clinic_name: "Demo Clinic",
  contact_email: "demo@clinic.com",
  contact_phone: "+971 50 123 4567",
  address: "Dubai Healthcare City",
  license_type: "trial",
  duration_days: 30
});

// Result contains:
// - customer_id
// - license_key
// - expires_at
```

## License Validation Process

### Validation Steps:

1. **Key Lookup**
   - Search database for license key
   - Return not_found if key doesn't exist

2. **Status Verification**
   - Check license status (active/suspended/expired)
   - Verify expiry date if set

3. **Feature Resolution**
   - Load features from license record
   - Apply feature restrictions based on license type

4. **Response Formation**
   - Return validation result
   - Include customer information
   - Provide feature list

### Validation Logic:
```typescript
const isValid = (
  license.status === 'active' && 
  (!license.expires_at || new Date(license.expires_at) > new Date())
);
```

## Customer Management

### Customer Operations:

1. **Create Customer**
   - Validate email format
   - Check email uniqueness
   - Store customer details

2. **Retrieve Customer**
   - By email lookup
   - By ID lookup
   - List all customers

3. **Update Customer** (Future Enhancement)
   - Modify contact details
   - Update clinic information

### Data Validation:
- Email format validation using Zod schemas
- Required field validation
- Unique constraint enforcement

## Testing the System

### 1. Manual Testing

**Test License Generation:**
1. Navigate to License Generator tab
2. Fill in test customer details:
   - Clinic Name: "Test Clinic"
   - Email: "test@clinic.com"
   - License Type: "trial"
3. Generate license and verify key format
4. Check License Manager for new entry

**Test License Validation:**
1. Use generated license key
2. Test in main application login
3. Verify feature restrictions apply

### 2. API Testing

**Using curl or Postman:**

```bash
# Generate License
curl -X POST http://localhost:5000/api/rpc/create_customer_license \
  -H "Content-Type: application/json" \
  -d '{
    "p_clinic_name": "Test Clinic",
    "p_contact_email": "test@clinic.com",
    "p_license_type": "trial"
  }'

# Validate License
curl -X POST http://localhost:5000/api/rpc/validate_license \
  -H "Content-Type: application/json" \
  -d '{
    "input_license_key": "TRL-2025-ABCD123456"
  }'
```

### 3. Database Verification

Check your database tables:
```sql
-- View all customers
SELECT * FROM customers;

-- View all licenses with customer info
SELECT l.*, c.clinic_name, c.contact_email 
FROM licenses l 
JOIN customers c ON l.customer_id = c.id;

-- Check license validation
SELECT license_key, status, expires_at, 
       (status = 'active' AND (expires_at IS NULL OR expires_at > NOW())) as is_valid
FROM licenses;
```

## Deployment Configuration

### 1. Environment Variables

Create `.env` file (if needed):
```env
DATABASE_URL=your_postgres_url_here
NODE_ENV=production
PORT=5000
```

### 2. Production Deployment

**On Replit:**
1. Your app automatically deploys on port 5000
2. Database connection is handled automatically
3. Static files are served correctly

**Production Checklist:**
- [ ] Database connection configured
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] CORS configured for your domain
- [ ] Rate limiting implemented (recommended)

### 3. Performance Considerations

- Database indexing on frequently queried fields
- License key uniqueness constraints
- Connection pooling for database
- Caching for frequently accessed licenses

## Advanced Features

### 1. License Renewal
```typescript
// Extend license expiry
async renewLicense(licenseKey: string, additionalDays: number) {
  const license = await getLicenseByKey(licenseKey);
  const newExpiry = new Date(license.expires_at);
  newExpiry.setDate(newExpiry.getDate() + additionalDays);
  
  return updateLicense(license.id, { expires_at: newExpiry });
}
```

### 2. Feature Flags
```typescript
// License with specific features
const premiumFeatures = {
  basic_features: true,
  advanced_reports: true,
  backup_restore: true,
  api_access: true,
  priority_support: true,
  custom_branding: true,
  advanced_analytics: true
};
```

### 3. Usage Tracking
```typescript
// Track license usage
interface LicenseUsage {
  license_id: string;
  active_users: number;
  patient_count: number;
  last_activity: Date;
  feature_usage: Record<string, number>;
}
```

### 4. License Migration
```typescript
// Upgrade trial to premium
async upgradeLicense(licenseKey: string) {
  const license = await getLicenseByKey(licenseKey);
  
  return updateLicense(license.id, {
    license_type: 'premium',
    max_users: 20,
    max_patients: 10000,
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    features: premiumFeatures
  });
}
```

## Troubleshooting

### Common Issues:

**1. License Key Not Found**
- Check database connection
- Verify license key format
- Ensure key was generated correctly

**2. Database Connection Failed**
- System falls back to memory storage
- Data won't persist between restarts
- Check database credentials

**3. License Validation Failing**
- Check expiry date
- Verify license status
- Ensure customer exists

**4. Frontend Not Loading Licenses**
- Check API endpoints
- Verify network requests
- Check browser console for errors

### Debug Steps:

1. **Check Server Logs**
   - Look for database connection status
   - Check API request/response logs
   - Monitor error messages

2. **Verify Database State**
   - Check if tables exist
   - Verify data integrity
   - Test direct database queries

3. **Test API Endpoints**
   - Use browser dev tools
   - Test with curl/Postman
   - Check response formats

4. **Frontend Debugging**
   - Check React DevTools
   - Monitor network requests
   - Verify state management

### Recovery Procedures:

**Lost License Keys:**
- Query database directly by customer email
- Use License Manager search functionality
- Check customer records

**Database Reset:**
- System will create demo data automatically
- Previous licenses will be lost (memory storage)
- Backup/restore procedures for production

**API Errors:**
- Check request format matches expected schema
- Verify all required fields are provided
- Ensure proper error handling in frontend

---

## Quick Start Checklist

- [ ] Database connected and tables created
- [ ] Demo data generated automatically
- [ ] License Generator working
- [ ] License Manager displays licenses
- [ ] License validation working
- [ ] API endpoints responding
- [ ] Frontend components rendering
- [ ] Search functionality working
- [ ] Copy to clipboard working
- [ ] License expiry handling working

Your licensing system is now ready for production use!
