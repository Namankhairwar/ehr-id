import { useState } from "react";
import { FileText, Search, Users, Stethoscope, Plus, Eye, Calendar, Heart, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MedicalButton } from "@/components/ui/button-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPatient } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(mockPatient);

  // Mock data for doctor's authorized patients
  const authorizedPatients = [
    {
      id: '1',
      name: 'Sarah Johnson',
      ehrId: 'EHR2024001',
      lastVisit: '2024-01-15',
      condition: 'Routine Checkup',
      priority: 'normal',
    },
    {
      id: '2',
      name: 'Robert Smith',
      ehrId: 'EHR2024002',
      lastVisit: '2024-01-10',
      condition: 'Diabetes Follow-up',
      priority: 'high',
    },
    {
      id: '3',
      name: 'Emily Davis',
      ehrId: 'EHR2024003',
      lastVisit: '2024-01-08',
      condition: 'Hypertension',
      priority: 'medium',
    },
  ];

  const todayAppointments = [
    { time: '09:00', patient: 'Sarah Johnson', type: 'Follow-up', status: 'confirmed' },
    { time: '10:30', patient: 'Robert Smith', type: 'Consultation', status: 'confirmed' },
    { time: '14:00', patient: 'Emily Davis', type: 'Checkup', status: 'pending' },
    { time: '15:30', patient: 'Michael Brown', type: 'New Patient', status: 'confirmed' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-white';
      case 'medium': return 'bg-medical-orange text-white';
      case 'normal': return 'bg-medical-green text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-medical-green text-white';
      case 'pending': return 'bg-medical-orange text-white';
      case 'cancelled': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-medical-green to-green-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">E.H.R. ID</h1>
              <p className="text-sm text-muted-foreground">Doctor Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium text-foreground">Dr. Michael Chen</p>
              <p className="text-sm text-muted-foreground">Internal Medicine</p>
            </div>
            <MedicalButton 
  variant="outline" 
  className="text-black"
  onClick={() => navigate('/login')}
>
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
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{authorizedPatients.length}</div>
              <div className="text-sm text-muted-foreground">Authorized Patients</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-medical-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{todayAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Today's Appointments</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-medical-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">15</div>
              <div className="text-sm text-muted-foreground">Recent Records</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">My Patients</TabsTrigger>
            <TabsTrigger value="search">Search Records</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="notes">Add Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Authorized Patients</h2>
              <MedicalButton>
                <Plus className="w-4 h-4 mr-2" />
                Request Access
              </MedicalButton>
            </div>
            
            <div className="grid gap-4">
              {authorizedPatients.map((patient) => (
                <Card key={patient.id} className="medical-card cursor-pointer hover:scale-[1.02] transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{patient.name}</h3>
                          <p className="text-muted-foreground">EHR ID: {patient.ehrId}</p>
                          <p className="text-sm text-muted-foreground">
                            Last Visit: {patient.lastVisit} • {patient.condition}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getPriorityColor(patient.priority)}>
                          {patient.priority}
                        </Badge>
                        <MedicalButton 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPatient(mockPatient)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Records
                        </MedicalButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Search Patient Records</h2>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by EHR ID, name, or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                <MedicalButton size="lg">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </MedicalButton>
              </div>
            </div>

            {searchQuery && (
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>
                    You can only access records for patients who have granted you permission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter a search term to find patient records</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Emergency Access */}
            <Card className="medical-card border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Emergency Access
                </CardTitle>
                <CardDescription className="text-red-600">
                  Access critical patient information during emergencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MedicalButton variant="emergency">
                  Request Emergency Access
                </MedicalButton>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Today's Appointments</h2>
            
            <div className="grid gap-4">
              {todayAppointments.map((appointment, index) => (
                <Card key={index} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {appointment.time}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                          <p className="text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <MedicalButton variant="outline" size="sm">
                          View Patient
                        </MedicalButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Add Medical Notes</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <MedicalButton variant="outline" className="h-20 flex flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    New Prescription
                  </MedicalButton>
                  <MedicalButton variant="outline" className="h-20 flex flex-col">
                    <Heart className="w-6 h-6 mb-2" />
                    Diagnosis
                  </MedicalButton>
                  <MedicalButton variant="outline" className="h-20 flex flex-col">
                    <Activity className="w-6 h-6 mb-2" />
                    Lab Order
                  </MedicalButton>
                  <MedicalButton variant="outline" className="h-20 flex flex-col">
                    <Calendar className="w-6 h-6 mb-2" />
                    Follow-up
                  </MedicalButton>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Added prescription for seasonal allergies</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-foreground">Robert Smith</p>
                    <p className="text-sm text-muted-foreground">Updated diabetes management plan</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
