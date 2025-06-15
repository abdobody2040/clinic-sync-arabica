
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, FileText, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface StatsCardsProps {
  patients: any[];
  appointments: any[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ patients, appointments }) => {
  const { t, isRTL } = useLanguage();

  // Calculate real statistics
  const totalPatients = patients.length;
  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(apt => apt.appointmentDate === today).length;
  const pendingInvoices = Math.floor(totalPatients * 0.3); // Mock calculation
  
  const stats = [
    {
      title: t("totalPatients"),
      value: totalPatients.toString(),
      icon: Users,
      color: "blue"
    },
    {
      title: t("todaysAppointments"),
      value: todaysAppointments.toString(),
      icon: Calendar,
      color: "green"
    },
    {
      title: t("pendingInvoices"),
      value: pendingInvoices.toString(),
      icon: FileText,
      color: "purple"
    },
    {
      title: t("systemStatus"),
      value: t("online"),
      icon: Settings,
      color: "orange",
      valueColor: "green"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <IconComponent className={`w-8 h-8 text-${stat.color}-600`} />
                <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.valueColor ? `text-${stat.valueColor}-600` : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
