import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Users } from "lucide-react";

const Splash = () => {
  const [phase, setPhase] = useState<"video" | "fading" | "splash">("video");
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (phase === "splash") {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleVideoEnd = () => {
    setPhase("fading");
    // After fade-out completes, show splash
    setTimeout(() => setPhase("splash"), 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue via-primary to-primary-hover relative overflow-hidden">
      {/* Video Layer */}
      {phase !== "splash" && (
        <div
          className={`absolute inset-0 z-20 transition-opacity duration-700 ease-in-out ${
            phase === "fading" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/30 via-primary/20 to-primary-hover/30 z-10 pointer-events-none" />
          <video
            ref={videoRef}
            src="/videos/splash-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleVideoEnd}
            className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300"
          >
            Skip
          </button>
        </div>
      )}

      {/* Splash Content Layer (always rendered underneath for seamless transition) */}
      <div
        className={`min-h-screen flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
          phase === "splash" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse-soft"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-pulse-soft delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full animate-pulse-soft delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-pulse-soft delay-500"></div>
        </div>

        <div className="text-center z-10 px-4">
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
            <div className="animate-fade-in-up">
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
    </div>
  );
};

export default Splash;
