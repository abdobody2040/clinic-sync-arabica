
# Clinic Management System

A comprehensive healthcare SaaS solution built with React, TypeScript, and Node.js. This system provides healthcare professionals with tools to manage patients, appointments, prescriptions, billing, inventory, and administrative functions with full Arabic and English language support.

## 🌟 Features

### Core Functionality
- **Patient Management**: Complete patient records, medical history, and document management
- **Appointment Scheduling**: Advanced scheduling system with multiple appointment types
- **Prescription Management**: Digital prescription generation with PDF export
- **Billing & Invoicing**: Comprehensive billing system with multi-currency support
- **Inventory Management**: Medical supplies tracking with low-stock alerts
- **Reports & Analytics**: Exportable reports in CSV format

### Advanced Features
- **Multi-language Support**: Complete Arabic and English localization with RTL support
- **Multi-currency Support**: AED, USD, EUR, SAR, EGP currency options
- **License Management**: SaaS licensing system with trial and premium tiers
- **User Profiles**: Customizable professional profiles
- **App Customization**: Branding and logo customization
- **Regular Prescriptions**: Template-based prescription system

## 🏗 Architecture

### Frontend Stack
- **React 18** with TypeScript in strict mode
- **Vite** for development and production builds  
- **Tailwind CSS** with dark mode and RTL support
- **Shadcn/ui** components built on Radix UI
- **TanStack Query** for server state management
- **React Router DOM** for client-side routing
- **React Hook Form** with Zod validation

### Backend Stack
- **Node.js** with TypeScript and ES modules
- **Express.js** REST API server
- **PostgreSQL** database via Neon serverless
- **Drizzle ORM** for type-safe database operations
- **Express sessions** with PostgreSQL store

### Database Schema
- **Users**: Authentication and profile management
- **Customers**: Clinic customer accounts
- **Licenses**: Multi-tier licensing system
- Automatic demo data generation on first run

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clinic-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with your database connection:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open http://localhost:5000 in your browser

### Production Build
```bash
npm run build
npm start
```

## 📱 Application Structure

### Directory Layout
```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── tabs/       # Main application tabs
│   │   │   ├── settings/   # Settings page components
│   │   │   ├── prescription/ # Prescription-related components
│   │   │   └── ui/         # Base UI components (Shadcn)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── i18n/           # Internationalization files
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Route components
│   │   └── utils/          # Helper utilities
├── server/                 # Express backend
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Data access layer
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
└── docs/                   # Documentation
```

### Key Components

#### Frontend Architecture
- **MainTabs**: Primary navigation interface
- **Dashboard**: Overview with statistics and quick actions
- **PatientManagement**: Complete patient record system
- **AppointmentScheduling**: Calendar-based appointment system
- **PrescriptionSystem**: Digital prescription creation and management
- **BillingSystem**: Invoice generation and payment tracking
- **InventoryManager**: Medical supplies and equipment tracking
- **SettingsPanel**: Multi-section configuration interface

#### Backend API Routes
- `/api/auth/*`: Authentication endpoints
- `/api/patients/*`: Patient management
- `/api/appointments/*`: Appointment scheduling
- `/api/prescriptions/*`: Prescription management
- `/api/billing/*`: Billing and invoicing
- `/api/inventory/*`: Inventory management
- `/api/reports/*`: Report generation
- `/api/rpc/*`: Remote procedure calls for complex operations

## 🌍 Internationalization

### Supported Languages
- **English (en)**: Default language with comprehensive translations
- **Arabic (ar)**: Complete Arabic translations with RTL layout support

### Language Features
- **RTL Layout**: Automatic right-to-left layout for Arabic
- **Dynamic Switching**: Runtime language switching without reload
- **Typography**: Optimized fonts and spacing for Arabic text
- **Cultural Adaptation**: Culturally appropriate formatting for dates, numbers

### Adding New Languages
1. Create new translation file in `client/src/i18n/`
2. Add language to `types.ts`
3. Import in `index.ts`
4. Add UI selection option

## 💰 Currency Support

### Supported Currencies
- **AED**: UAE Dirham
- **USD**: US Dollar  
- **EUR**: Euro
- **SAR**: Saudi Riyal
- **EGP**: Egyptian Pound

### Currency Features
- **Dynamic Formatting**: Automatic currency symbol and decimal formatting
- **Report Integration**: Currency settings affect all financial reports
- **Invoice Generation**: Multi-currency invoice support

## 🔐 Authentication & Authorization

### Authentication System
- **JWT-based**: Secure token authentication
- **Session Management**: PostgreSQL-backed sessions
- **License Validation**: Multi-tier license verification

### License Management
- **Trial Licenses**: Limited-time access with feature restrictions
- **Premium Licenses**: Full feature access
- **Admin Panel**: License generation and management interface
- **Automatic Validation**: Real-time license status checking

## 📊 Data Management

### Database Operations
- **Type-safe Operations**: Drizzle ORM with TypeScript
- **Connection Pooling**: Optimized database connections
- **Migration Support**: Schema versioning and updates
- **Backup Strategy**: Automated data backup recommendations

### Data Storage
- **Patient Records**: Encrypted sensitive medical information
- **Audit Logging**: Activity tracking for compliance
- **File Management**: Secure document storage
- **Export Functionality**: CSV export for reports and data

## 🎨 Customization

### App Customization
- **Branding**: Custom logo and application name
- **Theme System**: Light and dark mode support
- **Color Schemes**: Customizable color palettes
- **Layout Options**: Flexible interface layouts

### Settings Management
- **Profile Settings**: User profile and professional information
- **System Settings**: Application-wide configuration
- **Prescription Settings**: Template and format customization
- **Regular Prescriptions**: Quick prescription templates

## 📈 Reports & Analytics

### Available Reports
- **Patient Reports**: Demographics, visit history, medical summaries
- **Financial Reports**: Revenue, billing, payment tracking
- **Appointment Reports**: Scheduling analytics, no-show tracking
- **Inventory Reports**: Stock levels, usage patterns

### Export Options
- **CSV Format**: Spreadsheet-compatible exports
- **Date Filtering**: Custom date range selection
- **Category Filtering**: Specific report categories

## 🔧 Development

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # Type checking
npm run db:push      # Database schema update
```

### Code Quality
- **TypeScript**: Strict type checking throughout
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting
- **Zod Validation**: Runtime schema validation

### Testing Strategy
- **Component Testing**: React component unit tests
- **API Testing**: Backend endpoint testing
- **Integration Testing**: Full workflow testing
- **E2E Testing**: User journey validation

## 🚀 Deployment

### Replit Deployment
This application is optimized for Replit deployment:

1. **Automatic Dependencies**: Package installation via package.json
2. **Environment Variables**: Configure via Replit Secrets
3. **Database Connection**: Neon PostgreSQL integration
4. **Port Configuration**: Optimized for port 5000

### Production Considerations
- **Environment Variables**: Secure configuration management
- **Database Scaling**: Connection pooling and optimization
- **CDN Integration**: Static asset delivery
- **Monitoring**: Application performance tracking

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/login     # User login
POST /api/auth/logout    # User logout
GET  /api/auth/profile   # Get user profile
```

### Patient Management
```
GET    /api/patients              # List all patients
POST   /api/patients              # Create new patient
GET    /api/patients/:id          # Get patient details
PUT    /api/patients/:id          # Update patient
DELETE /api/patients/:id          # Delete patient
```

### Appointment Management
```
GET    /api/appointments          # List appointments
POST   /api/appointments          # Create appointment
PUT    /api/appointments/:id      # Update appointment
DELETE /api/appointments/:id      # Cancel appointment
```

### License Management
```
GET  /api/rpc/get_all_licenses    # Admin: List all licenses
POST /api/rpc/validate_license    # Validate license key
POST /api/rpc/generate_license    # Admin: Generate new license
```

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow TypeScript and React best practices
2. **Component Structure**: Use atomic design principles
3. **State Management**: Prefer hooks and React Query
4. **Testing**: Write tests for new features
5. **Documentation**: Update docs for new functionality

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Update documentation
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub issues
- **Community**: Join our development community

### Common Issues
- **Database Connection**: Verify DATABASE_URL environment variable
- **Port Conflicts**: Ensure port 5000 is available
- **Build Errors**: Clear node_modules and reinstall dependencies
- **Language Issues**: Verify translation files are properly imported

---

## 🔄 Migration Notes

**Successfully migrated from Lovable to Replit on August 11, 2025**
- ✅ Replaced Supabase with PostgreSQL using Neon
- ✅ Migrated authentication and license management to server-side
- ✅ Implemented persistent data storage with automatic fallback
- ✅ All functionality tested and working correctly
- ✅ Demo data automatically created on first run

For detailed migration information, see `replit.md`.
