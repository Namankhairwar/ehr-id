import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, User, Stethoscope, Building2, Shield } from "lucide-react";
import { MedicalButton } from "@/components/ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'hospital_admin' | null>(null);
  const [credentials, setCredentials] = useState({ email: '', password: '', ehrId: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: 'patient' as const,
      title: 'Patient',
      description: 'Access your medical records and manage permissions',
      icon: User,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'doctor' as const,
      title: 'Doctor',
      description: 'View authorized patient records and add medical notes',
      icon: Stethoscope,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'hospital_admin' as const,
      title: 'Hospital Admin',
      description: 'Manage hospital records and patient registrations',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const handleLogin = () => {
    if (!selectedRole) return;
    
    // Mock authentication - in real app, this would validate credentials
    toast({
      title: "Login Successful",
      description: `Welcome to E.H.R. ID ${selectedRole} dashboard`,
    });

    // Navigate to appropriate dashboard
    const routes = {
      patient: '/patient',
      doctor: '/doctor',
      hospital_admin: '/hospital',
    };
    
    navigate(routes[selectedRole]);
  };

  const getDemoCredentials = (role: string) => {
    const demos = {
      patient: { email: 'sarah.johnson@email.com', password: 'demo123', ehrId: 'EHR2024001' },
      doctor: { email: 'dr.chen@healthcenter.com', password: 'demo123', ehrId: '' },
      hospital_admin: { email: 'admin@cityhospital.com', password: 'demo123', ehrId: '' },
    };
    return demos[role as keyof typeof demos];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">E.H.R. ID</h1>
              <p className="text-sm text-muted-foreground">Electronic Health Record</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Secure Access Portal</h2>
          <p className="text-muted-foreground">Choose your role to access the healthcare platform</p>
        </div>

        {!selectedRole ? (
          /* Role Selection */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.id}
                  className="medical-card cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-center">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Login Form */
          <Card className="medical-card max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                {(() => {
                  const selectedRoleData = roles.find(r => r.id === selectedRole);
                  const Icon = selectedRoleData?.icon || User;
                  return (
                    <>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedRoleData?.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>{selectedRoleData?.title} Login</CardTitle>
                        <button 
                          onClick={() => setSelectedRole(null)}
                          className="text-sm text-primary hover:underline"
                        >
                          Switch Role
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {selectedRole === 'patient' && (
                <div className="space-y-2">
                  <Label htmlFor="ehrId">EHR ID</Label>
                  <Input
                    id="ehrId"
                    placeholder="Enter your EHR ID"
                    value={credentials.ehrId}
                    onChange={(e) => setCredentials(prev => ({ ...prev, ehrId: e.target.value }))}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <div className="space-y-3 pt-4">
                <MedicalButton 
                  className="w-full" 
                  onClick={handleLogin}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Login
                </MedicalButton>

                <div className="text-center">
                  <button
                    onClick={() => setCredentials(getDemoCredentials(selectedRole))}
                    className="text-sm text-primary hover:underline"
                  >
                    Use Demo Credentials
                  </button>
                </div>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg text-center text-sm text-muted-foreground">
                <Shield className="w-4 h-4 inline mr-1" />
                All communications are encrypted and HIPAA compliant
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;