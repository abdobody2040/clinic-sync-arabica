
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, FileText, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface StatsCardsProps {
  patients?: any[];
  appointments?: any[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ patients = [], appointments = [] }) => {
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
    <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4 sm:p-6">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 text-${stat.color}-600 flex-shrink-0`} />
                <div className={`${isRTL ? 'mr-3 sm:mr-4' : 'ml-3 sm:ml-4'} min-w-0 flex-1`}>
                  <p className={`text-xs sm:text-sm font-medium text-gray-600 truncate ${isRTL ? 'text-right' : 'text-left'}`}>{stat.title}</p>
                  <p className={`text-xl sm:text-2xl font-bold ${stat.valueColor ? `text-${stat.valueColor}-600` : 'text-gray-900'} ${isRTL ? 'text-right' : 'text-left'}`}>
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

export default StatsCards;
export { StatsCards };
