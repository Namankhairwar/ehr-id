import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'gu' | 'mr' | 'ta' | 'te' | 'bn';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    // Header
    'ehr.title': 'E.H.R. ID',
    'ehr.subtitle': 'Electronic Health Record',
    'access.platform': 'Access Platform',
    
    // Hero Section
    'hero.title1': 'Your Health Records,',
    'hero.title2': 'Securely Connected',
    'hero.description': 'E.H.R. ID revolutionizes healthcare by providing secure, instant access to complete medical records for patients, doctors, and hospitals nationwide.',
    'get.started': 'Get Started Today',
    
    // Features
    'features.title': 'Transforming Healthcare Access',
    'features.description': 'Advanced features designed to make healthcare more efficient, secure, and accessible.',
    'secure.encrypted': 'Secure & Encrypted',
    'secure.description': 'End-to-end encryption ensures your medical data remains private and secure.',
    'multi.role': 'Multi-Role Access',
    'multi.description': 'Seamless access for patients, doctors, and hospital administrators.',
    'complete.records': 'Complete Records',
    'complete.description': 'Comprehensive medical history, prescriptions, lab reports, and more.',
    'smart.search': 'Smart Search',
    'smart.description': 'Quick access to patient records using EHR ID, name, or phone number.',
    'emergency.access': 'Emergency Access',
    'emergency.description': 'Critical medical information available instantly during emergencies.',
    'mobile.ready': 'Mobile Ready',
    'mobile.description': 'Access your medical records anytime, anywhere on any device.',
    
    // CTA Section
    'cta.title': 'Ready to Revolutionize Your Healthcare Experience?',
    'cta.description': 'Join thousands of patients, doctors, and hospitals already using E.H.R. ID for better healthcare outcomes.',
    'start.journey': 'Start Your Health Journey',
    
    // Footer
    'footer.tagline': 'Secure healthcare records management for the digital age.',
    'platform': 'Platform',
    'for.patients': 'For Patients',
    'for.doctors': 'For Doctors', 
    'for.hospitals': 'For Hospitals',
    'security': 'Security',
    'data.encryption': 'Data Encryption',
    'privacy.policy': 'Privacy Policy',
    'compliance': 'Compliance',
    'terms.service': 'Terms of Service',
    'support': 'Support',
    'help.center': 'Help Center',
    'contact.us': 'Contact Us',
    'documentation': 'Documentation',
    'system.status': 'System Status',
    'copyright': '© 2024 E.H.R. ID. All rights reserved. Securing healthcare data worldwide.',
    'select.language': 'Select Language'
  },
  hi: {
    // Header
    'ehr.title': 'ई.एच.आर. आई.डी.',
    'ehr.subtitle': 'इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड',
    'access.platform': 'प्लेटफॉर्म एक्सेस करें',
    
    // Hero Section
    'hero.title1': 'आपके स्वास्थ्य रिकॉर्ड,',
    'hero.title2': 'सुरक्षित रूप से जुड़े',
    'hero.description': 'ई.एच.आर. आई.डी. स्वास्थ्य सेवा में क्रांति लाता है और मरीजों, डॉक्टरों और अस्पतालों के लिए पूर्ण चिकित्सा रिकॉर्ड तक सुरक्षित, तत्काल पहुंच प्रदान करता है।',
    'get.started': 'आज ही शुरुआत करें',
    
    // Features
    'features.title': 'स्वास्थ्य सेवा पहुंच में बदलाव',
    'features.description': 'उन्नत सुविधाएं जो स्वास्थ्य सेवा को अधिक कुशल, सुरक्षित और सुलभ बनाने के लिए डिज़ाइन की गई हैं।',
    'secure.encrypted': 'सुरक्षित और एन्क्रिप्टेड',
    'secure.description': 'एंड-टू-एंड एन्क्रिप्शन सुनिश्चित करता है कि आपका चिकित्सा डेटा निजी और सुरक्षित रहे।',
    'multi.role': 'बहु-भूमिका पहुंच',
    'multi.description': 'मरीजों, डॉक्टरों और अस्पताल प्रशासकों के लिए निर्बाध पहुंच।',
    'complete.records': 'पूर्ण रिकॉर्ड',
    'complete.description': 'व्यापक चिकित्सा इतिहास, नुस्खे, लैब रिपोर्ट और बहुत कुछ।',
    'smart.search': 'स्मार्ट खोज',
    'smart.description': 'ई.एच.आर. आई.डी., नाम या फोन नंबर का उपयोग करके मरीज़ के रिकॉर्ड तक त्वरित पहुंच।',
    'emergency.access': 'आपातकालीन पहुंच',
    'emergency.description': 'आपातकाल के दौरान महत्वपूर्ण चिकित्सा जानकारी तुरंत उपलब्ध।',
    'mobile.ready': 'मोबाइल तैयार',
    'mobile.description': 'कभी भी, कहीं भी, किसी भी डिवाइस पर अपने चिकित्सा रिकॉर्ड तक पहुंचें।',
    
    // CTA Section
    'cta.title': 'अपने स्वास्थ्य सेवा अनुभव में क्रांति लाने के लिए तैयार हैं?',
    'cta.description': 'हजारों मरीज़, डॉक्टर और अस्पताल पहले से ही बेहतर स्वास्थ्य परिणामों के लिए ई.एच.आर. आई.डी. का उपयोग कर रहे हैं।',
    'start.journey': 'अपनी स्वास्थ्य यात्रा शुरू करें',
    
    // Footer
    'footer.tagline': 'डिजिटल युग के लिए सुरक्षित स्वास्थ्य रिकॉर्ड प्रबंधन।',
    'platform': 'प्लेटफॉर्म',
    'for.patients': 'मरीजों के लिए',
    'for.doctors': 'डॉक्टरों के लिए',
    'for.hospitals': 'अस्पतालों के लिए',
    'security': 'सुरक्षा',
    'data.encryption': 'डेटा एन्क्रिप्शन',
    'privacy.policy': 'गोपनीयता नीति',
    'compliance': 'अनुपालन',
    'terms.service': 'सेवा की शर्तें',
    'support': 'सहायता',
    'help.center': 'सहायता केंद्र',
    'contact.us': 'संपर्क करें',
    'documentation': 'प्रलेखन',
    'system.status': 'सिस्टम स्थिति',
    'copyright': '© 2024 ई.एच.आर. आई.डी. सभी अधिकार सुरक्षित। दुनिया भर में स्वास्थ्य डेटा सुरक्षित करना।',
    'select.language': 'भाषा चुनें'
  },
  gu: {
    // Header
    'ehr.title': 'ઈ.એચ.આર. આઈ.ડી.',
    'ehr.subtitle': 'ઈલેક્ટ્રોનિક હેલ્થ રેકોર્ડ',
    'access.platform': 'પ્લેટફોર્મ એક્સેસ કરો',
    
    // Hero Section
    'hero.title1': 'તમારા સ્વાસ્થ્ય રેકોર્ડ્સ,',
    'hero.title2': 'સુરક્ષિત રીતે જોડાયેલા',
    'hero.description': 'ઈ.એચ.આર. આઈ.ડી. દર્દીઓ, ડોક્ટરો અને હોસ્પિટલો માટે સંપૂર્ણ મેડિકલ રેકોર્ડ્સની સુરક્ષિત, તાત્કાલિક પહોંચ પ્રદાન કરીને હેલ્થકેરમાં ક્રાંતિ લાવે છે।',
    'get.started': 'આજે જ શરૂઆત કરો',
    
    // Features
    'features.title': 'હેલ્થકેર એક્સેસમાં પરિવર્તન',
    'features.description': 'હેલ્થકેરને વધુ કાર્યક્ષમ, સુરક્ષિત અને સુલભ બનાવવા માટે ડિઝાઇન કરવામાં આવેલી અદ્યતન સુવિધાઓ।',
    'secure.encrypted': 'સુરક્ષિત અને એન્ક્રિપ્ટેડ',
    'secure.description': 'એન્ડ-ટુ-એન્ડ એન્ક્રિપ્શન ખાતરી કરે છે કે તમારો મેડિકલ ડેટા ખાનગી અને સુરક્ષિત રહે.',
    'multi.role': 'મલ્ટિ-રોલ એક્સેસ',
    'multi.description': 'દર્દીઓ, ડોક્ટરો અને હોસ્પિટલ એડમિનિસ્ટ્રેટર્સ માટે સીમલેસ એક્સેસ.',
    'complete.records': 'સંપૂર્ણ રેકોર્ડ્સ',
    'complete.description': 'વ્યાપક મેડિકલ હિસ્ટ્રી, પ્રિસ્ક્રિપ્શન્સ, લેબ રિપોર્ટ્સ અને વધુ.',
    'smart.search': 'સ્માર્ટ સર્ચ',
    'smart.description': 'ઈ.એચ.આર. આઈ.ડી., નામ અથવા ફોન નંબરનો ઉપયોગ કરીને દર્દીના રેકોર્ડ્સની ઝડપી પહોંચ.',
    'emergency.access': 'કટોકટી એક્સેસ',
    'emergency.description': 'કટોકટી દરમિયાન મહત્વપૂર્ણ મેડિકલ માહિતી તાત્કાલિક ઉપલબ્ધ.',
    'mobile.ready': 'મોબાઇલ તૈયાર',
    'mobile.description': 'કોઈપણ સમયે, ગમે ત્યાં, કોઈપણ ઉપકરણ પર તમારા મેડિકલ રેકોર્ડ્સ એક્સેસ કરો.',
    
    // CTA Section
    'cta.title': 'તમારા હેલ્થકેર અનુભવમાં ક્રાંતિ લાવવા માટે તૈયાર છો?',
    'cta.description': 'વધુ સારા સ્વાસ્થ્ય પરિણામો માટે હજારો દર્દીઓ, ડોક્ટરો અને હોસ્પિટલો પહેલેથી જ ઈ.એચ.આર. આઈ.ડી.નો ઉપયોગ કરી રહ્યા છે.',
    'start.journey': 'તમારી સ્વાસ્થ્ય યાત્રા શરૂ કરો',
    
    // Footer
    'footer.tagline': 'ડિજિટલ યુગ માટે સુરક્ષિત હેલ્થકેર રેકોર્ડ્સ મેનેજમેન્ટ.',
    'platform': 'પ્લેટફોર્મ',
    'for.patients': 'દર્દીઓ માટે',
    'for.doctors': 'ડોક્ટરો માટે',
    'for.hospitals': 'હોસ્પિટલો માટે',
    'security': 'સુરક્ષા',
    'data.encryption': 'ડેટા એન્ક્રિપ્શન',
    'privacy.policy': 'ગોપનીયતા નીતિ',
    'compliance': 'અનુપાલન',
    'terms.service': 'સેવાની શરતો',
    'support': 'સપોર્ટ',
    'help.center': 'હેલ્પ સેન્ટર',
    'contact.us': 'અમારો સંપર્ક કરો',
    'documentation': 'દસ્તાવેજીકરણ',
    'system.status': 'સિસ્ટમ સ્ટેટસ',
    'copyright': '© 2024 ઈ.એચ.આર. આઈ.ડી. બધા અધિકારો આરક્ષિત. વિશ્વભરમાં હેલ્થકેર ડેટા સુરક્ષિત કરવું.',
    'select.language': 'ભાષા પસંદ કરો'
  }
};