
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Calendar, MapPin, Heart, Shield, FileText } from 'lucide-react';

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

interface PatientDetailsViewProps {
  patient: Patient;
  onEdit: () => void;
  onClose: () => void;
}

export const PatientDetailsView: React.FC<PatientDetailsViewProps> = ({ patient, onEdit, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Details</h2>
        <div className="space-x-2">
          <Button onClick={onEdit}>Edit Patient</Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Full Name</p>
              <p className="text-lg">{patient.name}</p>
            </div>
            
            {patient.email && (
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <p>{patient.email}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <p>{patient.phone}</p>
              </div>
            </div>

            {patient.dateOfBirth && (
              <div>
                <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <p>{patient.dateOfBirth}</p>
                </div>
              </div>
            )}

            {patient.gender && (
              <div>
                <p className="text-sm font-medium text-gray-600">Gender</p>
                <Badge variant="secondary">{patient.gender}</Badge>
              </div>
            )}

            {patient.address && (
              <div>
                <p className="text-sm font-medium text-gray-600">Address</p>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <p>{patient.address}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patient.emergencyContact && (
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Name</p>
                <p className="text-lg">{patient.emergencyContact}</p>
              </div>
            )}

            {patient.emergencyPhone && (
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Phone</p>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <p>{patient.emergencyPhone}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patient.bloodType && (
              <div>
                <p className="text-sm font-medium text-gray-600">Blood Type</p>
                <Badge variant="outline">{patient.bloodType}</Badge>
              </div>
            )}

            {patient.allergies && (
              <div>
                <p className="text-sm font-medium text-gray-600">Allergies</p>
                <p className="text-sm bg-red-50 p-2 rounded">{patient.allergies}</p>
              </div>
            )}

            {patient.medications && (
              <div>
                <p className="text-sm font-medium text-gray-600">Current Medications</p>
                <p className="text-sm bg-blue-50 p-2 rounded">{patient.medications}</p>
              </div>
            )}

            {patient.medicalHistory && (
              <div>
                <p className="text-sm font-medium text-gray-600">Medical History</p>
                <p className="text-sm bg-gray-50 p-2 rounded">{patient.medicalHistory}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insurance Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Insurance Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patient.insuranceProvider && (
              <div>
                <p className="text-sm font-medium text-gray-600">Insurance Provider</p>
                <p>{patient.insuranceProvider}</p>
              </div>
            )}

            {patient.insuranceNumber && (
              <div>
                <p className="text-sm font-medium text-gray-600">Insurance Number</p>
                <p className="font-mono text-sm">{patient.insuranceNumber}</p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-600">Last Visit</p>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <p>{patient.lastVisit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
