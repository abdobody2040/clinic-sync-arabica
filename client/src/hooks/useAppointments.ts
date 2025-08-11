
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

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

export const useAppointments = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { 
      id: 1, 
      patientName: "Ahmed Al-Mansouri", 
      appointmentDate: "2024-01-15", 
      appointmentTime: "09:00",
      appointmentType: "consultation",
      duration: "30",
      status: "confirmed",
      notes: "General checkup and consultation"
    },
    { 
      id: 2, 
      patientName: "Fatima Hassan", 
      appointmentDate: "2024-01-15", 
      appointmentTime: "10:00",
      appointmentType: "followup",
      duration: "30",
      status: "completed",
      notes: "Follow-up visit"
    }
  ]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentViewMode, setAppointmentViewMode] = useState('list');
  
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleNewAppointment = () => {
    console.log("New Appointment button clicked");
    setShowAppointmentForm(true);
  };

  const handleAppointmentSubmit = (data: any) => {
    console.log("Appointment form submitted:", data);
    
    if (appointmentViewMode === 'edit' && selectedAppointment) {
      const updatedAppointment = {
        ...selectedAppointment,
        ...data
      };
      
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment.id === selectedAppointment.id ? updatedAppointment : appointment
        )
      );
      
      setAppointmentViewMode('list');
      setSelectedAppointment(null);
      
      toast({
        title: t("success"),
        description: "Appointment updated successfully!",
      });
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        ...data
      };
      
      setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
      
      toast({
        title: t("success"),
        description: "Appointment scheduled successfully!",
      });
    }
    
    setShowAppointmentForm(false);
  };

  const handleEditAppointment = (appointmentId: number) => {
    console.log("Edit appointment clicked for ID:", appointmentId);
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setAppointmentViewMode('edit');
      setShowAppointmentForm(true);
    }
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    console.log("Delete appointment clicked for ID:", appointmentId);
    setAppointments(prevAppointments => 
      prevAppointments.filter(appointment => appointment.id !== appointmentId)
    );
    
    toast({
      title: t("success"),
      description: "Appointment deleted successfully!",
    });
  };

  const handleCancelAppointmentForm = () => {
    setShowAppointmentForm(false);
    setSelectedAppointment(null);
    setAppointmentViewMode('list');
  };

  return {
    showAppointmentForm,
    appointments,
    selectedAppointment,
    appointmentViewMode,
    handleNewAppointment,
    handleAppointmentSubmit,
    handleEditAppointment,
    handleDeleteAppointment,
    handleCancelAppointmentForm
  };
};
