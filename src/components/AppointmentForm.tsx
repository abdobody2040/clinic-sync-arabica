
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const appointmentSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required'),
  appointmentDate: z.string().min(1, 'Date is required'),
  appointmentTime: z.string().min(1, 'Time is required'),
  appointmentType: z.string().min(1, 'Appointment type is required'),
  duration: z.string().min(1, 'Duration is required'),
  notes: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => void;
  onCancel: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: '',
      duration: '30',
      notes: '',
      status: 'scheduled',
    }
  });

  const handleSubmit = (data: AppointmentFormData) => {
    console.log('Submitting appointment data:', data);
    onSubmit(data);
    toast({
      title: t("success"),
      description: "Appointment scheduled successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Select onValueChange={(value) => form.setValue('patientName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ahmed Al-Mansouri">Ahmed Al-Mansouri</SelectItem>
                  <SelectItem value="Fatima Hassan">Fatima Hassan</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.patientName && (
                <p className="text-sm text-red-500">{form.formState.errors.patientName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="appointmentType">Appointment Type *</Label>
              <Select onValueChange={(value) => form.setValue('appointmentType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="checkup">General Checkup</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.appointmentType && (
                <p className="text-sm text-red-500">{form.formState.errors.appointmentType.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="appointmentDate">Date *</Label>
              <Input type="date" {...form.register('appointmentDate')} />
              {form.formState.errors.appointmentDate && (
                <p className="text-sm text-red-500">{form.formState.errors.appointmentDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="appointmentTime">Time *</Label>
              <Input type="time" {...form.register('appointmentTime')} />
              {form.formState.errors.appointmentTime && (
                <p className="text-sm text-red-500">{form.formState.errors.appointmentTime.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Select onValueChange={(value) => form.setValue('duration', value)} defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.duration && (
                <p className="text-sm text-red-500">{form.formState.errors.duration.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select onValueChange={(value) => form.setValue('status', value)} defaultValue="scheduled">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea {...form.register('notes')} placeholder="Additional notes about the appointment..." />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Appointment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
