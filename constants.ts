
import type { Language, Translations } from './types';
import { ViewType } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' }, // Hindi
  { code: 'bn', name: 'বাংলা' }, // Bengali
  { code: 'te', name: 'తెలుగు' }, // Telugu
  { code: 'mr', name: 'मराठी' }, // Marathi
  { code: 'ta', name: 'தமிழ்' }, // Tamil
  { code: 'gu', name: 'ગુજરાતી' }, // Gujarati
  { code: 'kn', name: 'ಕನ್ನಡ' }, // Kannada
  { code: 'ml', name: 'മലയാളം' }, // Malayalam
  { code: 'pa', name: 'ਪੰਜਾਬੀ' }, // Punjabi
  { code: 'or', name: 'ଓଡ଼ିଆ' }, // Odia
];

const EN_TRANSLATIONS: Translations = {
  appTitle: "Kisan Mitra AI",
  sidebar: {
    dashboard: "Dashboard",
    cropAdvisory: "Crop Advisory",
    marketWeather: "Market & Weather",
    govConnect: "Government Connect",
    language: "Language",
  },
  dashboard: {
    welcome: "Welcome to Kisan Mitra AI",
    subtitle: "Your trusted partner in modern farming. Select a service to get started.",
    cardDesc: "Get AI-powered assistance for",
  },
  chat: {
    thinking: "Kisan Mitra is thinking...",
    sources: "Sources:",
    inputPlaceholder: "Type your question here...",
    startPrompt: "Start the conversation by asking a question below, or try one of these examples.",
    error: "Sorry, I encountered an error. Please try again.",
    micError: "Microphone access denied. Please enable it in browser settings.",
    uploadImage: "Upload Image",
  },
  gov: {
    title: "Submit a Query",
    subtitle: "Raise complaints, request subsidies, or ask for scheme information.",
    form: {
      name: "Full Name",
      location: "Village/District",
      type: "Query Type",
      message: "Message",
      submit: "Submit Query",
      success: "Success",
      successMsg: "Your query has been submitted. A government official will respond shortly.",
      queryTypes: ["Complaint", "Subsidy Request", "Scheme Information", "Other"],
    },
    advisories: "Government Advisories",
    advisoriesSubtitle: "Latest updates and alerts from agricultural authorities.",
    demoAdvisories: [
        { title: "New Subsidy on Drip Irrigation", date: "2 days ago", content: "75% subsidy available on new installations. Apply now." },
        { title: "Pest Alert: Locust Swarm", date: "1 week ago", content: "Locust swarms reported in western districts. Take preventive measures." },
        { title: "Weather Alert: Heavy Rain", date: "3 hours ago", content: "Heavy rainfall predicted. Protect crops and livestock." }
    ]
  },
  cropAdvisory: {
      title: "Crop Advisory",
      description: "Ask about pests, diseases, farming techniques, or upload an image for identification.",
      prompts: [
          "Identify this pest from an image.",
          "What are the most common insects that attack cotton crops?",
          "Suggest some organic pest control methods for my vegetable garden.",
          "How do I identify and treat leaf curl virus on my chili plants?"
      ]
  },
  marketWeather: {
      title: "Market Prices & Weather",
      description: "Live updates on mandi prices, weather forecasts, and agricultural news.",
      loading: "Fetching latest news from the internet...",
      refresh: "Refresh Feed",
      readMore: "Read Full News",
      categories: {
          market: "Market Price",
          weather: "Weather Alert",
          general: "Agri News"
      },
      error: "Unable to fetch news at the moment. Please check your connection."
  }
};

const HI_TRANSLATIONS: Translations = {
  appTitle: "किसान मित्र एआई",
  sidebar: {
    dashboard: "डैशबोर्ड",
    cropAdvisory: "फसल सलाह",
    marketWeather: "बाजार और मौसम",
    govConnect: "सरकारी सेवाएँ",
    language: "भाषा",
  },
  dashboard: {
    welcome: "किसान मित्र एआई में आपका स्वागत है",
    subtitle: "आधुनिक खेती में आपका भरोसेमंद साथी। शुरू करने के लिए एक सेवा चुनें।",
    cardDesc: "इसके लिए एआई सहायता प्राप्त करें:",
  },
  chat: {
    thinking: "किसान मित्र सोच रहा है...",
    sources: "स्रोत:",
    inputPlaceholder: "अपना प्रश्न यहाँ टाइप करें...",
    startPrompt: "नीचे प्रश्न पूछकर बातचीत शुरू करें, या इन उदाहरणों में से एक आज़माएं।",
    error: "क्षमा करें, कोई त्रुटि हुई। कृपया पुन: प्रयास करें।",
    micError: "माइक्रोफ़ोन तक पहुंच अस्वीकृत।",
    uploadImage: "तस्वीर अपलोड करें",
  },
  gov: {
    title: "प्रश्न भेजें",
    subtitle: "शिकायतें उठाएं, सब्सिडी का अनुरोध करें, या योजना की जानकारी मांगें।",
    form: {
      name: "पूरा नाम",
      location: "गाँव/जिला",
      type: "प्रश्न का प्रकार",
      message: "संदेश",
      submit: "प्रश्न जमा करें",
      success: "सफल",
      successMsg: "आपका प्रश्न जमा कर दिया गया है। सरकारी अधिकारी जल्द ही जवाब देंगे।",
      queryTypes: ["शिकायत", "सब्सिडी अनुरोध", "योजना जानकारी", "अन्य"],
    },
    advisories: "सरकारी सलाह",
    advisoriesSubtitle: "कृषि अधिकारियों से नवीनतम अपडेट और अलर्ट।",
    demoAdvisories: [
        { title: "ड्रिप सिंचाई पर नई सब्सिडी", date: "2 दिन पहले", content: "नई स्थापनाओं पर 75% सब्सिडी उपलब्ध है। अभी आवेदन करें।" },
        { title: "कीट चेतावनी: टिड्डी दल", date: "1 सप्ताह पहले", content: "पश्चिमी जिलों में टिड्डी दल की सूचना मिली है। निवारक उपाय करें।" },
        { title: "मौसम चेतावनी: भारी बारिश", date: "3 घंटे पहले", content: "भारी बारिश की संभावना है। फसलों और पशुओं की सुरक्षा करें।" }
    ]
  },
  cropAdvisory: {
      title: "फसल सलाह",
      description: "कीटों, रोगों, खेती की तकनीकों के बारे में पूछें या पहचान के लिए एक छवि अपलोड करें।",
      prompts: [
          "छवि से इस कीट की पहचान करें।",
          "कपास की फसलों पर हमला करने वाले सबसे आम कीड़े कौन से हैं?",
          "मेरी सब्जी की बगीचे के लिए कुछ जैविक कीट नियंत्रण विधियों का सुझाव दें।",
          "मैं अपने मिर्च के पौधों पर पत्ती मरोड़ वायरस की पहचान और उपचार कैसे करूँ?"
      ]
  },
  marketWeather: {
      title: "बाजार और मौसम",
      description: "मंडी भाव, मौसम पूर्वानुमान और कृषि समाचार पर लाइव अपडेट।",
      loading: "इंटरनेट से नवीनतम समाचार ला रहा है...",
      refresh: "रीफ्रेश करें",
      readMore: "पूरा पढ़ें",
      categories: {
          market: "मंडी भाव",
          weather: "मौसम अलर्ट",
          general: "कृषि समाचार"
      },
      error: "इस समय समाचार लाने में असमर्थ। कृपया अपना कनेक्शन जांचें।"
  }
};

export const TRANSLATIONS: Record<string, Translations> = {
  en: EN_TRANSLATIONS,
  hi: HI_TRANSLATIONS,
  // Add simpler fallbacks for other languages for brevity
  bn: {
      ...EN_TRANSLATIONS,
      appTitle: "কিষাণ মিত্র এআই",
      sidebar: { dashboard: "ড্যাশবোর্ড", cropAdvisory: "ফসল পরামর্শ", marketWeather: "বাজার ও আবহাওয়া", govConnect: "সরকারি সংযোগ", language: "ভাষা" },
      marketWeather: {
        title: "বাজার দর ও আবহাওয়া",
        description: "বাজার দর এবং আবহাওয়ার পূর্বাভাস পান।",
        loading: "খবর লোড হচ্ছে...",
        refresh: "রিফ্রেশ",
        readMore: "পুরো পড়ুন",
        categories: { market: "বাজার দর", weather: "আবহাওয়া", general: "খবর" },
        error: "ত্রুটি হয়েছে।"
      }
  },
  te: {
      ...EN_TRANSLATIONS,
      appTitle: "కిసాన్ మిత్ర AI",
      sidebar: { dashboard: "డాష్‌బోర్డ్", cropAdvisory: "పంట సలహా", marketWeather: "మార్కెట్ & వాతావరణం", govConnect: "ప్రభుత్వ సేవలు", language: "భాష" },
      marketWeather: {
        title: "మార్కెట్ & వాతావరణం",
        description: "మార్కెట్ ధరలు మరియు వాతావరణ సూచనలు.",
        loading: "లోడ్ అవుతోంది...",
        refresh: "రీఫ్రెష్",
        readMore: "పూర్తిగా చదవండి",
        categories: { market: "మార్కెట్ ధర", weather: "వాతావరణం", general: "వార్తలు" },
        error: "లోపం."
      }
  },
  mr: {
      ...EN_TRANSLATIONS,
      appTitle: "किसान मित्र AI",
      sidebar: { dashboard: "डॅशबोर्ड", cropAdvisory: "पीक सल्ला", marketWeather: "बाजार आणि हवामान", govConnect: "सरकारी सेवा", language: "भाषा" },
      marketWeather: {
        title: "बाजार आणि हवामान",
        description: "बाजार भाव आणि हवामान अंदाज.",
        loading: "लोड करत आहे...",
        refresh: "रिफ्रेश",
        readMore: "पूर्ण वाचा",
        categories: { market: "बाजार भाव", weather: "हवामान", general: "बातम्या" },
        error: "त्रुटी."
      }
  },
  ta: {
      ...EN_TRANSLATIONS,
      appTitle: "கிசான் மித்ரா AI",
      sidebar: { dashboard: "டாஷ்போர்டு", cropAdvisory: "பயிர் ஆலோசனை", marketWeather: "சந்தை & வானிலை", govConnect: "அரசு இணைப்பு", language: "மொழி" },
      marketWeather: {
        title: "சந்தை & வானிலை",
        description: "சந்தை விலைகள் மற்றும் வானிலை.",
        loading: "ஏற்றுகிறது...",
        refresh: "புதுப்பி",
        readMore: "முழுவதும் படி",
        categories: { market: "சந்தை விலை", weather: "வானிலை", general: "செய்திகள்" },
        error: "பிழை."
      }
  },
  gu: {
      ...EN_TRANSLATIONS,
      appTitle: "કિસાન મિત્ર AI",
      sidebar: { dashboard: "ડેશબોર્ડ", cropAdvisory: "પાક સલાહ", marketWeather: "બજાર અને હવામાન", govConnect: "સરકારી કનેક્ટ", language: "ભાષા" },
      marketWeather: {
        title: "બજાર અને હવામાન",
        description: "બજાર ભાવ અને હવામાન આગાહી.",
        loading: "લોડ થઈ રહ્યું છે...",
        refresh: "રીફ્રેશ",
        readMore: "વધુ વાંચો",
        categories: { market: "બજાર ભાવ", weather: "હવામાન", general: "સમાચાર" },
        error: "ભૂલ."
      }
  },
  kn: {
      ...EN_TRANSLATIONS,
      appTitle: "ಕಿಸಾನ್ ಮಿತ್ರ AI",
      sidebar: { dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", cropAdvisory: "ಬೆಳೆ ಸಲಹೆ", marketWeather: "ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಹವಾಮಾನ", govConnect: "ಸರ್ಕಾರಿ ಸಂಪರ್ಕ", language: "ಭಾಷೆ" },
      marketWeather: {
        title: "ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಹವಾಮಾನ",
        description: "ಬೆಲೆಗಳು ಮತ್ತು ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ.",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        refresh: "ರಿಫ್ರೆಶ್",
        readMore: "ಮತ್ತಷ್ಟು ಓದಿ",
        categories: { market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", weather: "ಹವಾಮಾನ", general: "ಸುದ್ದಿ" },
        error: "ದೋಷ."
      }
  },
  ml: {
      ...EN_TRANSLATIONS,
      appTitle: "കിസാൻ മിത്ര AI",
      sidebar: { dashboard: "ഡാഷ്ബോർഡ്", cropAdvisory: "വിള ഉപദേശം", marketWeather: "വിപണിയും കാലാവസ്ഥയും", govConnect: "സർക്കാർ സേവനങ്ങൾ", language: "ഭാഷ" },
      marketWeather: {
        title: "വിപണിയും കാലാവസ്ഥയും",
        description: "വിപണി വിലകളും കാലാവസ്ഥയും.",
        loading: "ലോഡ് ചെയ്യുന്നു...",
        refresh: "പുതുക്കുക",
        readMore: "കൂടുതൽ വായിക്കുക",
        categories: { market: "വിപണി വില", weather: "കാലാവസ്ഥ", general: "വാർത്ത" },
        error: "പിശക്."
      }
  },
  pa: {
      ...EN_TRANSLATIONS,
      appTitle: "ਕਿਸਾਨ ਮਿੱਤਰ AI",
      sidebar: { dashboard: "ਡੈਸ਼ਬੋਰਡ", cropAdvisory: "ਫਸਲ ਸਲਾਹ", marketWeather: "ਮੰਡੀ ਅਤੇ ਮੌਸਮ", govConnect: "ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ", language: "ਭਾਸ਼ਾ" },
      marketWeather: {
        title: "ਮੰਡੀ ਅਤੇ ਮੌਸਮ",
        description: "ਮੰਡੀ ਦੇ ਭਾਅ ਅਤੇ ਮੌਸਮ।",
        loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
        refresh: "ਰੀਫ੍ਰੈਸ਼",
        readMore: "ਹੋਰ ਪੜ੍ਹੋ",
        categories: { market: "ਮੰਡੀ ਭਾਅ", weather: "ਮੌਸਮ", general: "ਖਬਰਾਂ" },
        error: "ਗਲਤੀ."
      }
  },
  or: {
      ...EN_TRANSLATIONS,
      appTitle: "କିଷାନ ମିତ୍ର AI",
      sidebar: { dashboard: "ଡ୍ୟାସବୋର୍ଡ", cropAdvisory: "ଫସଲ ପରାମର୍ଶ", marketWeather: "ବଜାର ଏବଂ ପାଣିପାଗ", govConnect: "ସରକାରୀ ସେବା", language: "ଭାଷା" },
      marketWeather: {
        title: "ବଜାର ଏବଂ ପାଣିପାଗ",
        description: "ବଜାର ଦର ଏବଂ ପାଣିପାଗ।",
        loading: "ଲୋଡ୍ ହେଉଛି...",
        refresh: "ରିଫ୍ରେଶ୍",
        readMore: "ଅଧିକ ପଢନ୍ତୁ",
        categories: { market: "ବଜାର ଦର", weather: "ପାଣିପାଗ", general: "ଖବର" },
        error: "ତ୍ରୁଟି."
      }
  }
};

type CommandMap = {
  [key in ViewType]?: {
    [langCode: string]: string[];
  };
};

export const COMMANDS: CommandMap = {
  [ViewType.DASHBOARD]: {
    en: ['dashboard', 'home', 'main page'],
    hi: ['डैशबोर्ड', 'होम', 'मुख्य पृष्ठ'],
    bn: ['ড্যাশবোর্ড', 'হোম', 'প্রধান পাতা'],
    te: ['డాష్బోర్డ్', 'హోమ్', 'ప్రధాన పేజీ'],
    mr: ['डॅशबोर्ड', 'होम', 'मुख्य पृष्ठ'],
    ta: ['டாஷ்போர்டு', 'முகப்பு', 'முதன்மை பக்கம்'],
    gu: ['ડેશબોર્ડ', 'હોમ', 'મુખ્ય પૃષ્ઠ'],
    kn: ['ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'ಹೋಮ್', 'ಮುಖ್ಯ ಪುಟ'],
  },
  [ViewType.CROP_ADVISORY]: {
    en: ['crop advisory', 'pest control', 'crop help'],
    hi: ['फसल सलाहकार', 'कीट नियंत्रण', 'फसल सहायता'],
    bn: ['শস্য উপদেষ্টা', ' কীটপতঙ্গ নিয়ন্ত্রণ', 'শস্য সহায়তা'],
    te: ['పంట సలహా', 'పురుగుల నియంత్రణ', 'పంట సహాయం'],
    mr: ['पीक सल्लागार', 'कीड नियंत्रण', 'पीक मदत'],
    ta: ['பயிர் ஆலோசனை', 'பூச்சி கட்டுப்பாடு', 'பயிர் உதவி'],
    gu: ['પાક સલાહકાર', 'જંતુ નિયંત્રણ', 'પાક મદદ'],
    kn: ['ಬೆಳೆ ಸಲಹೆಗಾರ', 'ಕೀಟ ನಿಯಂತ್ರಣ', 'ಬೆಳೆ ಸಹಾಯ'],
  },
  [ViewType.MARKET_WEATHER]: {
    en: ['market and weather', 'prices', 'weather forecast', 'news'],
    hi: ['बाजार और मौसम', 'कीमतें', 'मौसम पूर्वानुमान', 'समाचार'],
    bn: ['বাজার এবং আবহাওয়া', 'মূল্য', 'আবহাওয়ার পূর্বাভাস'],
    te: ['మార్కెట్ మరియు వాతావరణం', 'ధరలు', 'వాతావరణ సూచన'],
    mr: ['बाजार आणि हवामान', 'किंमती', 'हवामान अंदाज'],
    ta: ['சந்தை மற்றும் வானிலை', 'விலைகள்', 'வானிலை முன்னறிவிப்பு'],
    gu: ['બજાર અને હવામાન', 'કિંમતો', 'હવામાનની આગાહી'],
    kn: ['ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಹವಾಮಾನ', 'ಬೆಲೆಗಳು', 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ'],
  },
  [ViewType.GOV_CONNECT]: {
    en: ['government connect', 'government schemes', 'complaint'],
    hi: ['सरकारी कनेक्ट', 'सरकारी योजनाएं', 'शिकायत'],
    bn: ['সরকারি সংযোগ', 'সরকারি স্কিম', 'অভিযোগ'],
    te: ['ప్రభుత్వ కనెక్ట్', 'ప్రభుత్వ పథకాలు', 'ఫిర్యాదు'],
    mr: ['सरकारी कनेक्ट', 'सरकारी योजना', 'तक्रार'],
    ta: ['அரசு இணைப்பு', 'அரசு திட்டங்கள்', 'புகார்'],
    gu: ['સરકારી કનેક્ટ', 'સરકારી યોજનાઓ', 'ફરિયાદ'],
    kn: ['ಸರ್ಕಾರಿ ಸಂಪರ್ಕ', 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', 'ದೂರು'],
  }
};

export const ACTION_COMMANDS = {
  sendMessage: {
    en: ['send message', 'submit', 'send'],
    hi: ['संदेश भेजो', 'भेजो', 'सबमिट करें'],
    bn: ['বার্তা পাঠান', 'জমা দিন', 'পাঠান'],
    te: ['సందేశం పంపు', 'పంపు', 'సమర్పించు'],
    mr: ['संदेश पाठवा', 'पाठवा', 'सादर करा'],
    ta: ['செய்தி அனுப்பு', 'அனுப்பு', 'சமர்ப்பி'],
    gu: ['સંદેશ મોકલો', 'મોકલો', 'સબમિટ કરો'],
    kn: ['ಸંદೇಶ ಕಳುಹಿಸಿ', 'ಕಳುಹಿಸಿ', 'ಸಲ್ಲಿಸು'],
  },
  changeLanguage: {
    en: 'change language to',
    hi: 'भाषा बदलकर',
    bn: 'ভাষা পরিবর্তন করে',
    te: 'భాషను మార్చు',
    mr: 'भाषा बदला',
    ta: 'மொழியை மாற்று',
    gu: 'ભાષા બદલો',
    kn: 'ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ',
  }
};
