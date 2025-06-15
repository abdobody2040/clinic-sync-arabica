
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

  const reportTypes = [
    {
      id: 'patient-demographics',
      title: 'Patient Demographics',
      description: 'Age, gender, location statistics',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'appointment-summary',
      title: 'Appointment Summary',
      description: 'Scheduled, completed, cancelled appointments',
      icon: Calendar,
      color: 'green'
    },
    {
      id: 'financial-report',
      title: 'Financial Report',
      description: 'Revenue, expenses, payment status',
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 'medical-records',
      title: 'Medical Records Summary',
      description: 'Diagnoses, treatments, prescriptions',
      icon: FileText,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input 
                type="date" 
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <Label>End Date</Label>
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
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      console.log('Downloading report:', report.title);
                      toast({
                        title: "Download Started",
                        description: `${report.title} is being downloaded...`,
                      });
                    }}
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
          <CardTitle>Recent Reports</CardTitle>
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
                    <p className="text-sm text-gray-500">Generated on {report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
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
