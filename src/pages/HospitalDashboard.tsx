import { useState } from "react";
import { FileText, Building2, Users, Plus, UserPlus, BarChart3, Settings, Database, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalButton } from "@/components/ui/button-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [newPatient, setNewPatient] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    bloodType: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  // Mock hospital data
  const hospitalStats = {
    totalPatients: 15420,
    monthlyNew: 342,
    activeDoctors: 89,
    departments: 12,
  };

  const recentRegistrations = [
    { id: 'EHR2024345', name: 'Alice Johnson', date: '2024-01-15', department: 'Cardiology' },
    { id: 'EHR2024346', name: 'David Wilson', date: '2024-01-15', department: 'Emergency' },
    { id: 'EHR2024347', name: 'Maria Garcia', date: '2024-01-14', department: 'Pediatrics' },
    { id: 'EHR2024348', name: 'James Brown', date: '2024-01-14', department: 'Orthopedics' },
  ];

  const departmentStats = [
    { name: 'Emergency', patients: 245, growth: '+12%' },
    { name: 'Cardiology', patients: 189, growth: '+8%' },
    { name: 'Pediatrics', patients: 167, growth: '+15%' },
    { name: 'Orthopedics', patients: 143, growth: '+5%' },
    { name: 'Neurology', patients: 98, growth: '+22%' },
  ];

  const generateEHRId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `EHR${year}${random}`;
  };

  const handleRegisterPatient = () => {
    // Mock registration - in real app, this would create the patient record
    const ehrId = generateEHRId();
    alert(`Patient registered successfully! EHR ID: ${ehrId}`);
    setNewPatient({
      name: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      bloodType: '',
      emergencyContact: '',
      emergencyPhone: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">E.H.R. ID</h1>
              <p className="text-sm text-muted-foreground">Hospital Administration</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium text-foreground">City General Hospital</p>
              <p className="text-sm text-muted-foreground">Admin: Katie Wilson</p>
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
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{hospitalStats.totalPatients.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Patients</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <UserPlus className="w-8 h-8 text-medical-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{hospitalStats.monthlyNew}</div>
              <div className="text-sm text-muted-foreground">New This Month</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-medical-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{hospitalStats.activeDoctors}</div>
              <div className="text-sm text-muted-foreground">Active Doctors</div>
            </CardContent>
          </Card>
          
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Database className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{hospitalStats.departments}</div>
              <div className="text-sm text-muted-foreground">Departments</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="register">Register Patient</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Recent Patient Registrations</CardTitle>
                  <CardDescription>Latest patients registered in the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentRegistrations.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                        <p className="text-sm text-muted-foreground">{patient.date} • {patient.department}</p>
                      </div>
                      <Badge variant="outline">{patient.department}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Department Statistics</CardTitle>
                  <CardDescription>Patient distribution across departments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{dept.name}</p>
                        <p className="text-sm text-muted-foreground">{dept.patients} patients</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-medical-green" />
                        <span className="text-sm font-medium text-medical-green">{dept.growth}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MedicalButton variant="outline" className="h-20 flex flex-col">
                  <UserPlus className="w-6 h-6 mb-2" />
                  Register Patient
                </MedicalButton>
                <MedicalButton variant="outline" className="h-20 flex flex-col">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  View Reports
                </MedicalButton>
                <MedicalButton variant="outline" className="h-20 flex flex-col">
                  <Database className="w-6 h-6 mb-2" />
                  Manage Records
                </MedicalButton>
                <MedicalButton variant="outline" className="h-20 flex flex-col">
                  <Settings className="w-6 h-6 mb-2" />
                  System Settings
                </MedicalButton>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Register New Patient</CardTitle>
                <CardDescription>
                  Create a new EHR ID and patient record in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter patient's full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={newPatient.dateOfBirth}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Input
                        id="gender"
                        value={newPatient.gender}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
                        placeholder="Male/Female/Other"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="patient@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={newPatient.address}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Full address"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        value={newPatient.bloodType}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, bloodType: e.target.value }))}
                        placeholder="A+, B-, O+, etc."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        placeholder="Emergency contact name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        value={newPatient.emergencyPhone}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>

                    <div className="pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-2">Auto-Generated EHR ID:</p>
                        <p className="font-mono text-lg text-primary">{generateEHRId()}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This ID will be automatically assigned upon registration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <MedicalButton onClick={handleRegisterPatient} className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Register Patient
                  </MedicalButton>
                  <MedicalButton variant="outline" className="flex-1">
                    Clear Form
                  </MedicalButton>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Hospital Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Monthly Registration Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics charts would be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Performance metrics would be displayed here</p>
                    <p className="text-sm">Real-time data visualization</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>System Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">98.5%</div>
                    <div className="text-muted-foreground">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-medical-green">1,247</div>
                    <div className="text-muted-foreground">Daily Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-medical-orange">156ms</div>
                    <div className="text-muted-foreground">Average Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Hospital Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Hospital Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Hospital Name</Label>
                    <Input value="City General Hospital" readOnly />
                  </div>
                  <div>
                    <Label>License Number</Label>
                    <Input value="HSP-2024-001" readOnly />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input value="admin@cityhospital.com" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input value="+1 (555) 123-0000" />
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>EHR ID Format</Label>
                    <Input value="EHR{YEAR}{4-DIGIT}" readOnly />
                  </div>
                  <div>
                    <Label>Data Retention Period</Label>
                    <Input value="25 years" />
                  </div>
                  <div>
                    <Label>Backup Frequency</Label>
                    <Input value="Daily at 02:00 AM" />
                  </div>
                  <div>
                    <Label>Access Log Retention</Label>
                    <Input value="7 years" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Authentication</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Authentication</span>
                        <Badge className="bg-medical-green text-white">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Timeout</span>
                        <span className="text-sm text-muted-foreground">30 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Password Policy</span>
                        <Badge className="bg-medical-green text-white">Strong</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Data Protection</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Encryption</span>
                        <Badge className="bg-medical-green text-white">AES-256</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">HIPAA Compliance</span>
                        <Badge className="bg-medical-green text-white">Certified</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Audit Logging</span>
                        <Badge className="bg-medical-green text-white">Active</Badge>
                      </div>
                    </div>
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

export default HospitalDashboard;