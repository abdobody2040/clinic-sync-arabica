
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { AppointmentForm } from '@/components/AppointmentForm';

interface Appointment {
  id: number;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  status: string;
  notes: string;
}

interface AppointmentsTabProps {
  showAppointmentForm: boolean;
  selectedAppointment: Appointment | null;
  appointments: Appointment[];
  onNewAppointment: () => void;
  onAppointmentSubmit: (data: any) => void;
  onCancelAppointmentForm: () => void;
  onEditAppointment: (appointmentId: number) => void;
  onDeleteAppointment: (appointmentId: number) => void;
}

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  showAppointmentForm,
  selectedAppointment,
  appointments,
  onNewAppointment,
  onAppointmentSubmit,
  onCancelAppointmentForm,
  onEditAppointment,
  onDeleteAppointment
}) => {
  const { t } = useLanguage();

  if (showAppointmentForm) {
    return (
      <AppointmentForm 
        appointment={selectedAppointment}
        onSubmit={onAppointmentSubmit}
        onCancel={onCancelAppointmentForm}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {t("appointmentScheduling")}
        </CardTitle>
        <CardDescription className="text-sm">{t("manageAppointments")}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">{t("today")}</Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">{t("week")}</Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">{t("month")}</Button>
            </div>
            <Button onClick={onNewAppointment} className="w-full sm:w-auto text-sm">
              {t("newAppointment")}
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="border rounded-lg min-w-[700px]">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("patient")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("date")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("time")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">Type</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("status")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{appointment.patientName}</td>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{appointment.appointmentDate}</td>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{appointment.appointmentTime}</td>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm capitalize">{appointment.appointmentType}</td>
                      <td className="p-3 sm:p-4">
                        <Badge 
                          variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {appointment.status}
                        </Badge>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onEditAppointment(appointment.id)}
                            className="text-xs w-full sm:w-auto"
                          >
                            {t("edit")}
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => onDeleteAppointment(appointment.id)}
                            className="text-xs w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
