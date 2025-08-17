import { useState } from "react";
import { FileText, User, Settings, Shield, Download, Eye, Users, Heart, Calendar, Pill, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicalButton } from "@/components/ui/button-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPatient, mockAccessPermissions } from "@/data/mockData";
import { mockPatient2, mockPatient3 } from "@/data/additionalMockData";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  
  // Randomly select a patient for demo purposes
  const patients = [mockPatient, mockPatient2, mockPatient3];
  const randomPatient = patients[Math.floor(Math.random() * patients.length)];
  const [patient] = useState(randomPatient);
  const [permissions] = useState(mockAccessPermissions);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-medical-green text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'scheduled': return 'bg-medical-orange text-white';
      case 'revoked': case 'cancelled': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diagnosis': return Heart;
      case 'prescription': return Pill;
      case 'lab_result': return FileText;
      case 'vaccination': return Shield;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">E.H.R. ID</h1>
              <p className="text-sm text-muted-foreground">Patient Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium text-foreground">{patient.name}</p>
              <p className="text-sm text-muted-foreground">ID: {patient.ehrId}</p>
            </div>
            <MedicalButton variant="outline" onClick={() => navigate('/login')}>
              Logout
            </MedicalButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-medical-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{patient.medicalHistory.length}</div>
              <div className="text-sm text-muted-foreground">Medical Records</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Pill className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{patient.currentMedications.length}</div>
              <div className="text-sm text-muted-foreground">Active Medications</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-medical-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{permissions.filter(p => p.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Permissions</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{patient.recentVisits.filter(v => v.status === 'scheduled').length}</div>
              <div className="text-sm text-muted-foreground">Upcoming Visits</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Emergency Info */}
            <Card className="medical-card border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-orange-800">Blood Type</p>
                  <p className="text-orange-700">{patient.bloodType}</p>
                </div>
                <div>
                  <p className="font-medium text-orange-800">Allergies</p>
                  <p className="text-orange-700">{patient.allergies.join(', ')}</p>
                </div>
                <div>
                  <p className="font-medium text-orange-800">Emergency Contact</p>
                  <p className="text-orange-700">{patient.emergencyContact.name}</p>
                  <p className="text-orange-700">{patient.emergencyContact.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Recent Medical Records</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {patient.medicalHistory.slice(0, 3).map((record) => {
                    const Icon = getTypeIcon(record.type);
                    return (
                      <div key={record.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{record.title}</p>
                          <p className="text-sm text-muted-foreground">{record.date} • {record.doctorName}</p>
                        </div>
                        <Eye className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Upcoming Visits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {patient.recentVisits.filter(v => v.status === 'scheduled').map((visit) => (
                    <div key={visit.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{visit.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{visit.date} • {visit.hospitalName}</p>
                        <p className="text-sm text-muted-foreground">{visit.chiefComplaint}</p>
                      </div>
                      <Badge className={getStatusColor(visit.status)}>
                        {visit.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Medical Records</h2>
              <MedicalButton variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </MedicalButton>
            </div>
            
            <div className="grid gap-4">
              {patient.medicalHistory.map((record) => {
                const Icon = getTypeIcon(record.type);
                return (
                  <Card key={record.id} className="medical-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{record.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{record.type}</Badge>
                              <span className="text-sm text-muted-foreground">{record.date}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{record.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Dr. {record.doctorName} • {record.hospitalName}
                            </span>
                            <MedicalButton variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </MedicalButton>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Current Medications</h2>
            
            <div className="grid gap-4">
              {patient.currentMedications.map((medication) => (
                <Card key={medication.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-medical-green/10 rounded-lg flex items-center justify-center">
                          <Pill className="w-5 h-5 text-medical-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{medication.name}</h3>
                          <p className="text-muted-foreground">{medication.dosage} • {medication.frequency}</p>
                          <p className="text-sm text-muted-foreground">
                            Prescribed by {medication.prescribedBy} • Started {medication.startDate}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(medication.status)}>
                        {medication.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Access Permissions</h2>
              <MedicalButton>Grant New Access</MedicalButton>
            </div>
            
            <div className="grid gap-4">
              {permissions.map((permission) => (
                <Card key={permission.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{permission.doctorName}</h3>
                          <p className="text-muted-foreground">{permission.hospitalName}</p>
                          <p className="text-sm text-muted-foreground">
                            Access Level: {permission.accessLevel} • 
                            Granted: {permission.grantedDate}
                            {permission.expiryDate && ` • Expires: ${permission.expiryDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(permission.status)}>
                          {permission.status}
                        </Badge>
                        {permission.status === 'active' && (
                          <MedicalButton variant="outline" size="sm">
                            Revoke
                          </MedicalButton>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
            
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your basic information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <p className="text-muted-foreground">{patient.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Date of Birth</label>
                    <p className="text-muted-foreground">{patient.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Gender</label>
                    <p className="text-muted-foreground">{patient.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Blood Type</label>
                    <p className="text-muted-foreground">{patient.bloodType}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <p className="text-muted-foreground">{patient.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <p className="text-muted-foreground">{patient.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Address</label>
                    <p className="text-muted-foreground">{patient.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">EHR ID</label>
                    <p className="text-muted-foreground font-mono">{patient.ehrId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;