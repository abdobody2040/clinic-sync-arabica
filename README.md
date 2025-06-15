
# Medical Practice Management System

A comprehensive web-based medical practice management system built with React, TypeScript, and modern web technologies. This application helps healthcare providers manage patients, appointments, billing, and practice operations efficiently.

## Features

- **Patient Management**: Add, edit, view, and search patient records with detailed medical information
- **Appointment Scheduling**: Create, manage, and track patient appointments
- **Billing & Invoicing**: Generate and manage invoices for medical services
- **Inventory Management**: Track medical supplies and equipment
- **Reports Generation**: Generate various practice reports and analytics
- **Multi-language Support**: English and Arabic language support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

## System Requirements

### Development Environment
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 1GB free space

### Production Server Requirements
- **Web Server**: Nginx, Apache, or any static file server
- **Node.js**: Version 18.0+ (for build process)
- **Memory**: Minimum 2GB RAM
- **Storage**: 500MB for application files
- **Network**: HTTPS support recommended
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Installation

### Prerequisites
1. Install Node.js and npm from [nodejs.org](https://nodejs.org/)
2. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Local Development Setup

1. **Clone or Download the Project**
   ```bash
   # If using Git
   git clone <repository-url>
   cd medical-practice-management
   
   # Or download and extract the ZIP file
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open your browser and navigate to: `http://localhost:8080`
   - The application will automatically reload when you make changes

### Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`
- **License Key**: `DEMO-LICENSE-2024`

## Usage Guide

### Getting Started
1. **License Activation**: Enter the license key when prompted
2. **Login**: Use the default credentials or create new user accounts
3. **Dashboard**: Navigate through different sections using the top navigation tabs

### Main Features

#### Patient Management
- Click "Patients" tab to view all patients
- Use "Add New Patient" to register new patients
- Click on any patient to view detailed information
- Use the search function to quickly find patients

#### Appointment Scheduling
- Navigate to "Appointments" tab
- Click "New Appointment" to schedule appointments
- Edit or delete existing appointments as needed
- View appointments by date and status

#### Billing & Invoicing
- Go to "Billing" tab to manage financial transactions
- Create invoices for services rendered
- Track payment status and generate reports

#### Inventory Management
- Use "Inventory" tab to manage medical supplies
- Add new items, update quantities, and set reorder levels
- Track expiration dates and supplier information

#### Reports
- Access "Reports" tab for various analytics
- Generate patient reports, financial summaries, and operational metrics
- Export reports for external use

## Build and Deployment

### Building for Production

1. **Create Production Build**
   ```bash
   npm run build
   ```

2. **Build Output**
   - The build process creates a `dist` folder containing optimized static files
   - All assets are minified and optimized for production

### Deployment Options

#### Option 1: Static File Server (Nginx)

1. **Install Nginx** (Ubuntu/Debian):
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Configure Nginx**:
   Create `/etc/nginx/sites-available/medical-app`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/medical-app;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
   }
   ```

3. **Deploy Files**:
   ```bash
   sudo cp -r dist/* /var/www/medical-app/
   sudo ln -s /etc/nginx/sites-available/medical-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

#### Option 2: Apache HTTP Server

1. **Install Apache**:
   ```bash
   sudo apt update
   sudo apt install apache2
   ```

2. **Configure Virtual Host**:
   Create `/etc/apache2/sites-available/medical-app.conf`:
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /var/www/medical-app
       
       <Directory /var/www/medical-app>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # Handle React Router
       FallbackResource /index.html
   </VirtualHost>
   ```

3. **Deploy Files**:
   ```bash
   sudo cp -r dist/* /var/www/medical-app/
   sudo a2ensite medical-app.conf
   sudo systemctl restart apache2
   ```

#### Option 3: Cloud Platforms

**Netlify**:
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

**Vercel**:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts for deployment

**AWS S3 + CloudFront**:
1. Create S3 bucket with static website hosting
2. Upload `dist` folder contents to S3
3. Configure CloudFront for global CDN distribution

### SSL Certificate Setup

For production deployments, enable HTTPS:

**Using Certbot (Let's Encrypt)**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Configuration

### Production Environment Variables
Create environment-specific configurations:

```bash
# For production builds
VITE_API_URL=https://your-api-domain.com
VITE_APP_VERSION=1.0.0
```

### Performance Optimization
- Enable gzip compression on your web server
- Configure proper cache headers for static assets
- Use CDN for faster global content delivery
- Monitor application performance and loading times

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Ensure Node.js version is 18+
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run type-check`

2. **Routing Issues**:
   - Configure server to serve `index.html` for all routes
   - Ensure `FallbackResource` or `try_files` is properly set

3. **Performance Issues**:
   - Enable gzip compression
   - Optimize images and assets
   - Use browser caching strategies

### Support
For technical support or feature requests, please contact your system administrator or development team.

## License

This software requires a valid license key for operation. Contact your vendor for licensing information.

## Security Considerations

- Always use HTTPS in production
- Regularly update dependencies for security patches
- Implement proper backup strategies
- Follow healthcare data protection regulations (HIPAA, GDPR)
- Use strong authentication mechanisms
- Regular security audits and monitoring

---

**Version**: 1.0.0  
**Last Updated**: June 2025
