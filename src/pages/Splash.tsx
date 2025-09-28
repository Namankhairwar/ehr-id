import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Users, Heart } from "lucide-react";

const Splash = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue via-primary to-primary-hover flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse-soft"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-pulse-soft delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full animate-pulse-soft delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-pulse-soft delay-500"></div>
      </div>

      <div className="text-center z-10 px-4">
        {/* Main Logo and Title */}
        <div className="animate-fade-in-up mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                E.H.R. ID
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                Electronic Health Record
              </p>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        {loading ? (
          <div className="animate-fade-in-up mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
            </div>
            <p className="text-white/80 text-lg">Initializing Secure Healthcare Platform...</p>
          </div>
        ) : (
          /* Content After Loading */
          <div className="animate-fade-in-up">
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Shield className="w-8 h-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Secure & Encrypted</h3>
                <p className="text-blue-100 text-sm">Advanced encryption protects your medical data</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Users className="w-8 h-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Multi-Role Access</h3>
                <p className="text-blue-100 text-sm">Patients, doctors, and hospitals in one platform</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FileText className="w-8 h-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Complete Records</h3>
                <p className="text-blue-100 text-sm">All your medical history in one place</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-primary hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Splash;