# Overview

This is a comprehensive clinic management system built with a modern fullstack architecture. The application provides healthcare professionals with tools to manage patients, appointments, prescriptions, billing, inventory, and administrative functions. It features a bilingual interface (English/Arabic) with RTL support and includes a license management system for controlling access to features.

The system is designed as a SaaS solution where administrators can generate and manage licenses for different clinic customers, with support for trial and premium license types.

## Migration Status
**Successfully migrated from Lovable to Replit on August 11, 2025**
- ✅ Replaced Supabase with PostgreSQL database using Neon
- ✅ Migrated all authentication and license management to server-side API routes  
- ✅ Implemented persistent data storage with automatic fallback
- ✅ All functionality tested and working correctly
- ✅ Demo data automatically created on first run

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript in strict mode
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **State Management**: React hooks with custom hooks for specific domains (auth, patients, appointments, etc.)
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: React Router DOM with client-side routing
- **Internationalization**: Custom i18n system supporting English and Arabic with RTL layout
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with TypeScript and ES modules
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store using connect-pg-simple
- **Development**: Development server with hot reloading and request logging middleware
- **Production**: Build process using esbuild for server bundling

## Data Storage
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless connection with WebSocket support
- **Tables**: Users, customers, and licenses with proper foreign key relationships

## Authentication & Authorization
- **License-based Access**: Multi-tier licensing system (trial/premium)
- **Token-based Authentication**: JWT tokens stored in localStorage
- **User Profiles**: Configurable user profiles with professional details
- **Session Management**: PostgreSQL-backed sessions for persistent login state

## Key Features Architecture
- **Multi-language Support**: Complete i18n with Arabic RTL support
- **Multi-currency Support**: Configurable currency display (AED, USD, EUR, SAR, EGP)
- **License Management**: Admin panel for generating and managing customer licenses
- **Prescription System**: PDF generation, regular prescriptions library, customizable templates
- **Inventory Management**: Stock tracking with low-stock alerts and categories
- **Reports Generation**: Exportable reports in CSV format
- **Settings Management**: Modular settings system with localStorage persistence

## Component Architecture
- **Atomic Design**: Reusable UI components with consistent design system
- **Feature-based Organization**: Components grouped by functionality (tabs, settings, prescription)
- **Custom Hooks**: Domain-specific hooks for state management and business logic
- **Form Components**: Standardized form components with validation and error handling

# External Dependencies

## Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL database with WebSocket support
- **Drizzle ORM**: Type-safe database operations and schema management

## UI & Design System
- **Radix UI**: Accessible UI primitives for components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class composition

## Development Tools
- **Vite**: Fast build tool with HMR and development server
- **TypeScript**: Type safety across frontend and backend
- **Replit Integration**: Development environment optimizations

## Form & Validation
- **React Hook Form**: Performant form handling
- **Zod**: Schema validation for forms and API data
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Data Management
- **TanStack Query**: Server state management and caching
- **Nanoid**: Secure ID generation for entities
- **Date-fns**: Date manipulation and formatting

## PDF & Document Generation
- **Custom PDF Generator**: HTML-based prescription PDF generation using browser printing

## Session & State Management
- **Connect PG Simple**: PostgreSQL session store for Express
- **LocalStorage**: Client-side persistence for settings and preferences