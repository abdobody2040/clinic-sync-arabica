
import { useState, useCallback } from 'react';

export interface RegularPrescription {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  category: string;
}

export const useRegularPrescriptions = () => {
  const [regularPrescriptions, setRegularPrescriptions] = useState<RegularPrescription[]>(() => {
    const stored = localStorage.getItem('regular_prescriptions');
    return stored ? JSON.parse(stored) : [
      {
        id: 1,
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Every 6 hours',
        duration: '3 days',
        instructions: 'Take with food',
        category: 'Pain Relief'
      },
      {
        id: 2,
        name: 'Amoxicillin',
        dosage: '250mg',
        frequency: 'Three times daily',
        duration: '7 days',
        instructions: 'Complete the full course',
        category: 'Antibiotic'
      },
      {
        id: 3,
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'Twice daily',
        duration: '5 days',
        instructions: 'Take after meals',
        category: 'Anti-inflammatory'
      }
    ];
  });

  const addRegularPrescription = useCallback((prescription: Omit<RegularPrescription, 'id'>) => {
    const newPrescription = {
      ...prescription,
      id: Math.max(...regularPrescriptions.map(p => p.id), 0) + 1
    };
    const updated = [...regularPrescriptions, newPrescription];
    setRegularPrescriptions(updated);
    localStorage.setItem('regular_prescriptions', JSON.stringify(updated));
  }, [regularPrescriptions]);

  const updateRegularPrescription = useCallback((id: number, prescription: Partial<RegularPrescription>) => {
    const updated = regularPrescriptions.map(p => 
      p.id === id ? { ...p, ...prescription } : p
    );
    setRegularPrescriptions(updated);
    localStorage.setItem('regular_prescriptions', JSON.stringify(updated));
  }, [regularPrescriptions]);

  const deleteRegularPrescription = useCallback((id: number) => {
    const updated = regularPrescriptions.filter(p => p.id !== id);
    setRegularPrescriptions(updated);
    localStorage.setItem('regular_prescriptions', JSON.stringify(updated));
  }, [regularPrescriptions]);

  return {
    regularPrescriptions,
    addRegularPrescription,
    updateRegularPrescription,
    deleteRegularPrescription
  };
};
