import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Users, FileText, Search, Clock, Smartphone } from "lucide-react";
import { MedicalButton } from "@/components/ui/button-variants";
import { DemoModal } from "@/components/ui/demo-modal";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    content?: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    content: '',
  });

  const openModal = (title: string, description: string, content?: string) => {
    setModalState({
      isOpen: true,
      title,
      description,
      content,
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const features = [
    {
      icon: Shield,
      title: t("secure.encrypted"),
      description: t("secure.description"),
    },
    {
      icon: Users,
      title: t("multi.role"),
      description: t("multi.description"),
    },
    {
      icon: FileText,
      title: t("complete.records"),
      description: t("complete.description"),
    },
    {
      icon: Search,
      title: t("smart.search"),
      description: t("smart.description"),
    },
    {
      icon: Clock,
      title: t("emergency.access"),
      description: t("emergency.description"),
    },
    {
      icon: Smartphone,
      title: t("mobile.ready"),
      description: t("mobile.description"),
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
              <h1 className="text-xl font-bold text-foreground">{t('ehr.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('ehr.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link to="/register">
              <MedicalButton variant="secondary">Register</MedicalButton>
            </Link>
            <Link to="/login">
              <MedicalButton variant="primary">Sign In</MedicalButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t('hero.title1')}
              <span className="block text-primary">{t('hero.title2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <MedicalButton size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">{t('get.started')}</MedicalButton>
              </Link>
              <Link to="/login">
                <MedicalButton variant="secondary" size="lg">Sign In</MedicalButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="medical-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(feature.title, "Coming Soon", `${feature.title} feature is currently under development. Stay tuned for updates!`)}
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
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <MedicalButton 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-blue-50"
              >
                {t('start.journey')}
              </MedicalButton>
            </Link>
            <Link to="/login">
              <MedicalButton 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Already have account? Sign In
              </MedicalButton>
            </Link>
          </div>
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
                <span className="text-xl font-bold">{t('ehr.title')}</span>
              </div>
              <p className="text-slate-400">
                {t('footer.tagline')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('platform')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => openModal(t("for.patients"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('for.patients')}</button></li>
                <li><button onClick={() => openModal(t("for.doctors"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('for.doctors')}</button></li>
                <li><button onClick={() => openModal(t("for.hospitals"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('for.hospitals')}</button></li>
                <li><button onClick={() => openModal(t("emergency.access"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('emergency.access')}</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('security')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => openModal(t("data.encryption"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('data.encryption')}</button></li>
                <li><button onClick={() => openModal(t("privacy.policy"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('privacy.policy')}</button></li>
                <li><button onClick={() => openModal(t("compliance"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('compliance')}</button></li>
                <li><button onClick={() => openModal(t("terms.service"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('terms.service')}</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('support')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => openModal(t("help.center"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('help.center')}</button></li>
                <li><button onClick={() => openModal(t("contact.us"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('contact.us')}</button></li>
                <li><button onClick={() => openModal(t("documentation"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('documentation')}</button></li>
                <li><button onClick={() => openModal(t("system.status"), "Coming Soon", "This feature is currently under development. Stay tuned for updates!")} className="hover:text-white transition-colors cursor-pointer">{t('system.status')}</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>{t('copyright')}</p>
          </div>
        </div>
      </footer>
      
      <DemoModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        description={modalState.description}
        content={modalState.content}
      />
    </div>
  );
};

export default Index;