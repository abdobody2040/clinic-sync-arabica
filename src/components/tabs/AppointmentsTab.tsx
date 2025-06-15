
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
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          {t("appointmentScheduling")}
        </CardTitle>
        <CardDescription>{t("manageAppointments")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline">{t("today")}</Button>
              <Button variant="outline">{t("week")}</Button>
              <Button variant="outline">{t("month")}</Button>
            </div>
            <Button onClick={onNewAppointment}>{t("newAppointment")}</Button>
          </div>
          
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4">{t("patient")}</th>
                  <th className="text-left p-4">{t("date")}</th>
                  <th className="text-left p-4">{t("time")}</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">{t("status")}</th>
                  <th className="text-left p-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="p-4">{appointment.patientName}</td>
                    <td className="p-4">{appointment.appointmentDate}</td>
                    <td className="p-4">{appointment.appointmentTime}</td>
                    <td className="p-4">{appointment.appointmentType}</td>
                    <td className="p-4">
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEditAppointment(appointment.id)}
                        >
                          {t("edit")}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => onDeleteAppointment(appointment.id)}
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
      </CardContent>
    </Card>
  );
};
