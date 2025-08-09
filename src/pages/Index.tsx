import { Link } from "react-router-dom";
import { Shield, Users, FileText, Search, Clock, Smartphone } from "lucide-react";
import { MedicalButton } from "@/components/ui/button-variants";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Encrypted",
      description: "End-to-end encryption ensures your medical data remains private and secure.",
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Seamless access for patients, doctors, and hospital administrators.",
    },
    {
      icon: FileText,
      title: "Complete Records",
      description: "Comprehensive medical history, prescriptions, lab reports, and more.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Quick access to patient records using EHR ID, name, or phone number.",
    },
    {
      icon: Clock,
      title: "Emergency Access",
      description: "Critical medical information available instantly during emergencies.",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access your medical records anytime, anywhere on any device.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">E.H.R. ID</h1>
              <p className="text-xs text-muted-foreground">Electronic Health Record</p>
            </div>
          </div>
          <Link to="/login">
            <MedicalButton variant="primary">Access Platform</MedicalButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Health Records,
              <span className="block text-primary">Securely Connected</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              E.H.R. ID revolutionizes healthcare by providing secure, instant access to complete 
              medical records for patients, doctors, and hospitals nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <MedicalButton size="lg">Get Started Today</MedicalButton>
              </Link>
              <MedicalButton variant="outline" size="lg">
                Learn More
              </MedicalButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transforming Healthcare Access
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced features designed to make healthcare more efficient, secure, and accessible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="medical-card p-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-hover">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Revolutionize Your Healthcare Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients, doctors, and hospitals already using E.H.R. ID 
            for better healthcare outcomes.
          </p>
          <Link to="/login">
            <MedicalButton 
              variant="secondary" 
              size="lg"
              className="bg-white text-primary hover:bg-blue-50"
            >
              Start Your Health Journey
            </MedicalButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">E.H.R. ID</span>
              </div>
              <p className="text-slate-400">
                Secure healthcare records management for the digital age.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li>For Patients</li>
                <li>For Doctors</li>
                <li>For Hospitals</li>
                <li>Emergency Access</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Data Encryption</li>
                <li>Privacy Policy</li>
                <li>Compliance</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>System Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 E.H.R. ID. All rights reserved. Securing healthcare data worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;