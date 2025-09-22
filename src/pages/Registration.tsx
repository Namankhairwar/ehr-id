import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Stethoscope, User, Building2, ArrowLeft, ArrowRight } from "lucide-react";

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    // Patient specific
    ehrId: "",
    dateOfBirth: "",
    // Doctor specific
    licenseNumber: "",
    specialization: "",
    experience: "",
    // Hospital specific
    hospitalName: "",
    address: "",
    adminName: "",
  });

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description: "Register for medical care",
      icon: User,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "Join as healthcare provider",
      icon: Stethoscope,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      id: "hospital",
      title: "Hospital Admin",
      description: "Manage hospital operations",
      icon: Building2,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role to continue",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      // Simulate registration process
      toast({
        title: "Registration Successful!",
        description: `Welcome ${formData.fullName}! Please check your email to verify your account.`,
      });

      // Navigate to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case "patient":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ehrId">EHR ID (Optional)</Label>
              <Input
                id="ehrId"
                placeholder="Enter your Electronic Health Record ID"
                value={formData.ehrId}
                onChange={(e) => handleInputChange("ehrId", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
          </div>
        );

      case "doctor":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="licenseNumber">Medical License Number *</Label>
              <Input
                id="licenseNumber"
                placeholder="Enter your medical license number"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization *</Label>
              <Input
                id="specialization"
                placeholder="e.g., Cardiology, Pediatrics"
                value={formData.specialization}
                onChange={(e) => handleInputChange("specialization", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="Enter years of experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
              />
            </div>
          </div>
        );

      case "hospital":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hospitalName">Hospital Name *</Label>
              <Input
                id="hospitalName"
                placeholder="Enter hospital name"
                value={formData.hospitalName}
                onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Hospital Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete hospital address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="adminName">Administrator Name *</Label>
              <Input
                id="adminName"
                placeholder="Enter administrator name"
                value={formData.adminName}
                onChange={(e) => handleInputChange("adminName", e.target.value)}
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Step Navigation */}
      <div className="fixed top-4 left-4 right-4 flex justify-between z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Home</span>
        </button>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-all duration-200"
        >
          <span className="text-sm font-medium">Login</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join MediConnect</h1>
          <p className="text-xl text-gray-600">Create your account to get started</p>
        </div>

        {!selectedRole ? (
          /* Role Selection */
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Select Your Role</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <Card
                    key={role.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${role.color}`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardContent className="p-8 text-center">
                      <Icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                      <p className="text-muted-foreground">{role.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          /* Registration Form */
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Register as {roles.find(r => r.id === selectedRole)?.title}
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setSelectedRole("")}
                className="self-start text-muted-foreground"
              >
                ← Change Role
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Role Specific Fields */}
              {renderRoleSpecificFields()}

              {/* Submit Button */}
              <Button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                size="lg"
              >
                Create Account
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => navigate("/login")}
                    className="p-0 h-auto font-semibold text-primary"
                  >
                    Sign in here
                  </Button>
                </p>
              </div>

              {/* Security Notice */}
              <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
                All data is encrypted and HIPAA compliant.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Registration;