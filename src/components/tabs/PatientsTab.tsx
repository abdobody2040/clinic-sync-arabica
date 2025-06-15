
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Heart, Pill, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { PatientForm } from '@/components/PatientForm';
import { PatientDetailsView } from '@/components/PatientDetailsView';
import { PatientEditForm } from '@/components/PatientEditForm';

interface Patient {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
  medications?: string;
  medicalHistory?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

interface PatientsTabProps {
  showPatientForm: boolean;
  viewMode: string;
  selectedPatient: Patient | null;
  patients: Patient[];
  onAddNewPatient: () => void;
  onPatientSubmit: (data: any) => void;
  onCancelPatientForm: () => void;
  onViewPatient: (patientName: string) => void;
  onEditPatient: (patientName: string) => void;
  onPatientUpdate: (data: any) => void;
  onClosePatientView: () => void;
  onEditFromView: () => void;
}

export const PatientsTab: React.FC<PatientsTabProps> = ({
  showPatientForm,
  viewMode,
  selectedPatient,
  patients,
  onAddNewPatient,
  onPatientSubmit,
  onCancelPatientForm,
  onViewPatient,
  onEditPatient,
  onPatientUpdate,
  onClosePatientView,
  onEditFromView
}) => {
  const { t } = useLanguage();

  if (showPatientForm) {
    return (
      <PatientForm 
        onSubmit={onPatientSubmit}
        onCancel={onCancelPatientForm}
      />
    );
  }

  if (viewMode === 'view' && selectedPatient) {
    return (
      <PatientDetailsView
        patient={selectedPatient}
        onEdit={onEditFromView}
        onClose={onClosePatientView}
      />
    );
  }

  if (viewMode === 'edit' && selectedPatient) {
    return (
      <PatientEditForm
        patient={selectedPatient}
        onSubmit={onPatientUpdate}
        onCancel={onClosePatientView}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          {t("patientManagement")}
        </CardTitle>
        <CardDescription>{t("viewManagePatients")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Input placeholder={t("searchPatients")} className="max-w-sm" />
            <Button onClick={onAddNewPatient}>{t("addNewPatient")}</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  <div>
                    <p className="font-medium">{t("medicalRecords")}</p>
                    <p className="text-sm text-gray-600">156 {t("records")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Pill className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">{t("prescriptions")}</p>
                    <p className="text-sm text-gray-600">89 {t("active")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <FlaskConical className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium">{t("labResults")}</p>
                    <p className="text-sm text-gray-600">23 {t("pending")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4">{t("name")}</th>
                  <th className="text-left p-4">{t("phone")}</th>
                  <th className="text-left p-4">{t("lastVisit")}</th>
                  <th className="text-left p-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b">
                    <td className="p-4">{patient.name}</td>
                    <td className="p-4">{patient.phone}</td>
                    <td className="p-4">{patient.lastVisit}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => onViewPatient(patient.name)}>
                          {t("view")}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onEditPatient(patient.name)}>
                          {t("edit")}
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
