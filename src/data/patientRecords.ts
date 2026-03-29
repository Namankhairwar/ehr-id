import { Patient } from "@/types";

export const patientRecordsMap: Record<string, Patient> = {
  "1": {
    id: "1",
    ehrId: "EHR2024001",
    name: "Sarah Johnson",
    dateOfBirth: "1990-05-12",
    gender: "Female",
    phone: "+91 99887 76655",
    email: "sarah.johnson@email.com",
    address: "45 Park Avenue, Mumbai 400001",
    bloodType: "O+",
    allergies: ["Penicillin"],
    emergencyContact: { name: "Mark Johnson", phone: "+91 99887 11223", relationship: "Spouse" },
    medicalHistory: [
      { id: "r1", date: "2024-01-15", type: "diagnosis", title: "Routine Checkup", description: "Annual physical exam. BP: 118/76. All vitals normal. Advised continued exercise routine.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r2", date: "2023-10-22", type: "lab_result", title: "Complete Blood Count", description: "CBC within normal limits. Hemoglobin: 13.2 g/dL, WBC: 6,800/μL, Platelets: 245,000/μL.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r3", date: "2023-08-05", type: "prescription", title: "Allergy Medication", description: "Prescribed Loratadine 10mg once daily for seasonal allergies. 60-day supply.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r4", date: "2023-05-18", type: "vaccination", title: "Influenza Vaccine", description: "Annual flu vaccination administered. No adverse reactions.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
    ],
    currentMedications: [
      { id: "m1", name: "Loratadine", dosage: "10mg", frequency: "Once daily", startDate: "2023-08-05", prescribedBy: "Dr. Michael Chen", status: "active" },
    ],
    recentVisits: [
      { id: "v1", date: "2024-01-15", type: "checkup", doctorName: "Dr. Michael Chen", hospitalName: "City General Hospital", chiefComplaint: "Annual physical", diagnosis: "Healthy - no issues", status: "completed" },
      { id: "v2", date: "2023-10-22", type: "followup", doctorName: "Dr. Michael Chen", hospitalName: "City General Hospital", chiefComplaint: "Lab results review", diagnosis: "All normal", status: "completed" },
    ],
  },
  "2": {
    id: "2",
    ehrId: "EHR2024002",
    name: "Robert Smith",
    dateOfBirth: "1975-11-30",
    gender: "Male",
    phone: "+91 88776 55443",
    email: "robert.smith@email.com",
    address: "12 Lake Road, Bangalore 560001",
    bloodType: "B+",
    allergies: ["Sulfa drugs", "Aspirin"],
    emergencyContact: { name: "Linda Smith", phone: "+91 88776 99887", relationship: "Wife" },
    medicalHistory: [
      { id: "r5", date: "2024-01-10", type: "diagnosis", title: "Diabetes Follow-up", description: "HbA1c: 7.1%. Fasting glucose: 142 mg/dL. Adjusted insulin dosage. Diet counseling provided.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r6", date: "2023-12-01", type: "lab_result", title: "Lipid Panel", description: "Total cholesterol: 220 mg/dL, LDL: 140 mg/dL (elevated), HDL: 45 mg/dL. Statin therapy recommended.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r7", date: "2023-09-15", type: "prescription", title: "Metformin Adjustment", description: "Increased Metformin to 1000mg twice daily. Monitor blood sugar levels weekly.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r8", date: "2023-07-20", type: "diagnosis", title: "Diabetic Retinopathy Screening", description: "No signs of diabetic retinopathy. Next screening in 12 months.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r9", date: "2023-04-10", type: "lab_result", title: "Kidney Function Test", description: "Creatinine: 1.0 mg/dL, eGFR: 85 mL/min. Kidney function within acceptable range.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
    ],
    currentMedications: [
      { id: "m2", name: "Metformin", dosage: "1000mg", frequency: "Twice daily", startDate: "2023-09-15", prescribedBy: "Dr. Michael Chen", status: "active" },
      { id: "m3", name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", startDate: "2023-12-01", prescribedBy: "Dr. Michael Chen", status: "active" },
      { id: "m4", name: "Insulin Glargine", dosage: "20 units", frequency: "Once daily at bedtime", startDate: "2023-01-10", prescribedBy: "Dr. Michael Chen", status: "active" },
    ],
    recentVisits: [
      { id: "v3", date: "2024-01-10", type: "followup", doctorName: "Dr. Michael Chen", hospitalName: "City General Hospital", chiefComplaint: "Diabetes management review", diagnosis: "Type 2 Diabetes - moderately controlled", status: "completed" },
      { id: "v4", date: "2023-12-01", type: "consultation", doctorName: "Dr. Michael Chen", hospitalName: "City General Hospital", chiefComplaint: "High cholesterol concerns", diagnosis: "Hyperlipidemia", status: "completed" },
    ],
  },
  "3": {
    id: "3",
    ehrId: "EHR2024003",
    name: "Emily Davis",
    dateOfBirth: "1988-07-22",
    gender: "Female",
    phone: "+91 77665 44332",
    email: "emily.davis@email.com",
    address: "78 Green Street, Chennai 600001",
    bloodType: "A-",
    allergies: ["Latex"],
    emergencyContact: { name: "James Davis", phone: "+91 77665 88990", relationship: "Brother" },
    medicalHistory: [
      { id: "r10", date: "2024-01-08", type: "diagnosis", title: "Hypertension Management", description: "BP: 148/92. Amlodipine dosage increased to 10mg. Lifestyle modifications discussed. Follow-up in 4 weeks.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r11", date: "2023-11-15", type: "lab_result", title: "Thyroid Panel", description: "TSH: 3.2 mIU/L (normal), Free T4: 1.1 ng/dL (normal). Thyroid function within normal limits.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
      { id: "r12", date: "2023-09-01", type: "prescription", title: "Amlodipine Prescription", description: "Started Amlodipine 5mg once daily for hypertension. Monitor BP at home twice daily.", doctorId: "4", doctorName: "Dr. Michael Chen", hospitalId: "1", hospitalName: "City General Hospital" },
    ],
    currentMedications: [
      { id: "m5", name: "Amlodipine", dosage: "10mg", frequency: "Once daily", startDate: "2024-01-08", prescribedBy: "Dr. Michael Chen", status: "active" },
    ],
    recentVisits: [
      { id: "v5", date: "2024-01-08", type: "followup", doctorName: "Dr. Michael Chen", hospitalName: "City General Hospital", chiefComplaint: "Blood pressure monitoring", diagnosis: "Hypertension - Stage 1", status: "completed" },
    ],
  },
};
