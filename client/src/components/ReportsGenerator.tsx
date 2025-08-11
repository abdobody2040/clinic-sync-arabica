
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { FileText, Download, Calendar, Users, BarChart3 } from 'lucide-react';

export const ReportsGenerator: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async (type: string) => {
    console.log('Generating report:', type, dateRange);
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: t("success"),
        description: `${type} report generated successfully!`,
      });
    }, 2000);
  };

  const handleDownloadReport = (reportName: string) => {
    console.log('Downloading report:', reportName);
    
    // Create a sample CSV content
    const csvContent = `Report Name,${reportName}\nGenerated Date,${new Date().toLocaleDateString()}\nData,Sample Data\n`;
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: t("success"),
      description: `${reportName} downloaded successfully!`,
    });
  };

  const reportTypes = React.useMemo(() => [
    {
      id: 'patient-demographics',
      title: t("patientDemographics"),
      description: t("ageGenderLocationStatistics"),
      icon: Users,
      color: 'blue'
    },
    {
      id: 'appointment-summary',
      title: t("appointmentSummary"),
      description: t("scheduledCompletedCancelledAppointments"),
      icon: Calendar,
      color: 'green'
    },
    {
      id: 'financial-report',
      title: t("financialReport"),
      description: t("revenueExpensesPaymentStatus"),
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 'medical-records',
      title: t("medicalRecordsSummary"),
      description: t("diagnosesTreatmentsPrescriptions"),
      icon: FileText,
      color: 'orange'
    }
  ], [t]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("generateReports")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t("startDate")}</Label>
              <Input 
                type="date" 
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <Label>{t("endDate")}</Label>
              <Input 
                type="date" 
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const IconComponent = report.icon;
          return (
            <Card key={report.id} className={`border-l-4 border-l-${report.color}-500`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-8 h-8 text-${report.color}-500`} />
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button 
                    onClick={() => handleGenerateReport(report.title)}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? t("generating") : t("generate")}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadReport(report.title)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("recentReports")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Patient Demographics - January 2024', date: '2024-01-31', size: '245 KB' },
              { name: 'Financial Report - Q4 2023', date: '2024-01-15', size: '1.2 MB' },
              { name: 'Appointment Summary - December 2023', date: '2024-01-02', size: '567 KB' },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-500">{t("generatedOn")} {report.date} • {report.size}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadReport(report.name)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
