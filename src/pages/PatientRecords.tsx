import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Pill, Calendar, Stethoscope, AlertTriangle, User, Heart, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicalButton } from "@/components/ui/button-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientRecordsMap } from "@/data/patientRecords";

const PatientRecords = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const patient = patientRecordsMap[patientId || "1"];

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-background to-blue-50 flex items-center justify-center">
        <Card className="medical-card p-8 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Patient Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested patient record does not exist.</p>
          <MedicalButton onClick={() => navigate("/doctor")}>Back to Dashboard</MedicalButton>
        </Card>
      </div>
    );
  }

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case "diagnosis": return <Stethoscope className="w-4 h-4" />;
      case "prescription": return <Pill className="w-4 h-4" />;
      case "lab_result": return <Activity className="w-4 h-4" />;
      case "vaccination": return <Heart className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getRecordTypeBadge = (type: string) => {
    switch (type) {
      case "diagnosis": return "bg-primary/10 text-primary";
      case "prescription": return "bg-medical-green/10 text-medical-green";
      case "lab_result": return "bg-purple-100 text-purple-700";
      case "vaccination": return "bg-medical-orange/10 text-medical-orange";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getMedicationStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-medical-green text-white";
      case "completed": return "bg-muted text-muted-foreground";
      case "discontinued": return "bg-destructive text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getVisitStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-medical-green text-white";
      case "scheduled": return "bg-primary text-white";
      case "cancelled": return "bg-destructive text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-background to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MedicalButton variant="outline" size="sm" onClick={() => navigate("/doctor")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </MedicalButton>
            <div>
              <h1 className="text-xl font-bold text-foreground">Patient Records</h1>
              <p className="text-sm text-muted-foreground">Viewing medical history</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Patient Info Card */}
        <Card className="medical-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                  <p className="text-muted-foreground">EHR ID: {patient.ehrId}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">DOB:</span> <span className="text-foreground">{patient.dateOfBirth}</span></p>
                  <p><span className="text-muted-foreground">Gender:</span> <span className="text-foreground">{patient.gender}</span></p>
                  <p><span className="text-muted-foreground">Blood Type:</span> <span className="font-semibold text-destructive">{patient.bloodType}</span></p>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{patient.phone}</span></p>
                  <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{patient.email}</span></p>
                </div>
              </div>
            </div>

            {/* Allergies */}
            {patient.allergies.length > 0 && (
              <div className="mt-4 p-3 bg-destructive/5 border border-destructive/20 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.allergies.map((a) => (
                      <Badge key={a} variant="outline" className="border-destructive/30 text-destructive text-xs">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
          </TabsList>

          {/* Medical History */}
          <TabsContent value="history" className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Medical Records ({patient.medicalHistory.length})
            </h3>
            {patient.medicalHistory.map((record) => (
              <Card key={record.id} className="medical-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${getRecordTypeBadge(record.type)}`}>
                        {getRecordTypeIcon(record.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{record.title}</h4>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                    </div>
                    <Badge className={getRecordTypeBadge(record.type)} variant="outline">
                      {record.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{record.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>👨‍⚕️ {record.doctorName}</span>
                    <span>🏥 {record.hospitalName}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Medications */}
          <TabsContent value="medications" className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Current Medications ({patient.currentMedications.length})
            </h3>
            {patient.currentMedications.map((med) => (
              <Card key={med.id} className="medical-card">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-medical-green/10 rounded-lg">
                        <Pill className="w-5 h-5 text-medical-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{med.name}</h4>
                        <p className="text-sm text-muted-foreground">{med.dosage} — {med.frequency}</p>
                        <p className="text-xs text-muted-foreground">Since {med.startDate} • By {med.prescribedBy}</p>
                      </div>
                    </div>
                    <Badge className={getMedicationStatusColor(med.status)}>{med.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Visits */}
          <TabsContent value="visits" className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Recent Visits ({patient.recentVisits.length})
            </h3>
            {patient.recentVisits.map((visit) => (
              <Card key={visit.id} className="medical-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground capitalize">{visit.type}</h4>
                        <p className="text-sm text-muted-foreground">{visit.date}</p>
                        <p className="text-sm text-foreground mt-1">
                          <span className="text-muted-foreground">Complaint:</span> {visit.chiefComplaint}
                        </p>
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">Diagnosis:</span> {visit.diagnosis}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {visit.doctorName} • {visit.hospitalName}
                        </p>
                      </div>
                    </div>
                    <Badge className={getVisitStatusColor(visit.status)}>{visit.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientRecords;
