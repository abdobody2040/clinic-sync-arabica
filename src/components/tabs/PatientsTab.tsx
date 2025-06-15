
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
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {t("patientManagement")}
        </CardTitle>
        <CardDescription className="text-sm">{t("viewManagePatients")}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Input 
              placeholder={t("searchPatients")} 
              className="w-full sm:max-w-sm text-sm" 
            />
            <Button onClick={onAddNewPatient} className="w-full sm:w-auto text-sm">
              {t("addNewPatient")}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{t("medicalRecords")}</p>
                    <p className="text-xs sm:text-sm text-gray-600">156 {t("records")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center">
                  <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{t("prescriptions")}</p>
                    <p className="text-xs sm:text-sm text-gray-600">89 {t("active")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center">
                  <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{t("labResults")}</p>
                    <p className="text-xs sm:text-sm text-gray-600">23 {t("pending")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="overflow-x-auto">
            <div className="border rounded-lg min-w-[600px]">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("name")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("phone")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("lastVisit")}</th>
                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{patient.name}</td>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{patient.phone}</td>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{patient.lastVisit}</td>
                      <td className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onViewPatient(patient.name)}
                            className="text-xs w-full sm:w-auto"
                          >
                            {t("view")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onEditPatient(patient.name)}
                            className="text-xs w-full sm:w-auto"
                          >
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
        </div>
      </CardContent>
    </Card>
  );
};
