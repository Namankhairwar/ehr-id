export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'hospital_admin';
  ehrId?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  ehrId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: MedicalRecord[];
  currentMedications: Medication[];
  recentVisits: Visit[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'diagnosis' | 'prescription' | 'lab_result' | 'vaccination' | 'procedure';
  title: string;
  description: string;
  doctorId: string;
  doctorName: string;
  hospitalId: string;
  hospitalName: string;
  documents?: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface Visit {
  id: string;
  date: string;
  type: 'checkup' | 'emergency' | 'consultation' | 'followup';
  doctorName: string;
  hospitalName: string;
  chiefComplaint: string;
  diagnosis: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface AccessPermission {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  hospitalName: string;
  grantedDate: string;
  expiryDate?: string;
  accessLevel: 'full' | 'limited' | 'emergency_only';
  status: 'active' | 'revoked' | 'expired';
}