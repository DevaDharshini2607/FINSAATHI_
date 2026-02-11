import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const videoLists = {
    en: [
        { id: 'pamSxKfOv4U', title: 'Personal Loan Guide', desc: 'Understanding personal loans.' },
        { id: 'mU69g6Ao47A', title: 'Home Loan Explained', desc: 'Everything about home loans.' },
        { id: 'C3ma_enSYm8', title: 'Vehicle Loan', desc: 'How to finance your vehicle.' },
        { id: 'xUZqg7Og17M', title: 'Education Loan', desc: 'Investing in education.' },
        { id: '8pHyH_g3QzY', title: 'Gold Loan', desc: 'Understanding gold loans.' },
        { id: '4cG8VQm-1GI', title: 'Post Office Schemes', desc: 'Secure saving schemes.' },
        { id: 'J6oHchaCxvM', title: 'Money Saving Methods', desc: 'Effective ways to save money.' },
        { id: '1Z1eZurhP-0', title: 'UPI Guide', desc: 'How to use UPI safely.' },
        { id: 'P-d63Rpm63M', title: 'ATM Card Activation', desc: 'Activating your new ATM card.' },
        { id: 'ohMydKJsPeg', title: 'Cash Withdrawal', desc: 'How to withdraw cash from ATM.' },
        { id: 'aOEGuRU68hc', title: 'Cash Deposit', desc: 'Depositing cash via CDM.' },
        { id: 'uhy6eeAurPg', title: 'EMI Basics', desc: 'Understanding Equated Monthly Installments.' },
        { id: 'GdIxMsyAM_c', title: 'Insurance Basics', desc: 'Why you need insurance.' },
        { id: 'zI5ajDYpFQE', title: 'Account Opening', desc: 'How to open a bank account.' },
        { id: 'O4-MtfawzAY', title: 'Types of Bank Accounts', desc: 'Savings vs Current accounts.' },
        { id: 'rM6JomMxM3g', title: 'Challan Filling', desc: 'How to fill bank challans.' },
    ],
    // Tamil Videos Provided by User
    ta: [
        { id: 'KfqVeLnijp0', title: 'Personal Loan (தனிநபர் கடன்)', desc: 'தனிநபர் கடன் பற்றிய முழு விவரம்.' },
        { id: 'RNxy1GXowWc', title: 'Home Loan (வீட்டுக் கடன்)', desc: 'வீட்டுக் கடன் பெறுவது எப்படி?' },
        { id: '7Ppkh7ZfDts', title: 'Vehicle Loan (வாகனக் கடன்)', desc: 'வாகனக் கடன் பற்றிய தகவல்கள்.' },
        { id: 'KHHN55HITtQ', title: 'Education Loan (கல்விக் கடன்)', desc: 'மாணவர்களுக்கான கல்விக் கடன்.' },
        { id: 'nhJIHMUH0hY', title: 'Gold Loan (நகைக்கடன்)', desc: 'நகைக்கடன் பெறுவது எப்படி?' },
        { id: 'cGuETPsGbw8', title: 'Post Office Schemes (அஞ்சலக சேமிப்பு)', desc: 'அஞ்சலக சேமிப்பு திட்டங்கள்.' },
        { id: '8AIOWdbbOGA', title: 'Money Saving (பணம் சேமிப்பு)', desc: 'பணம் சேமிக்கும் முறைகள்.' },
        { id: '1BWJAIWjJ78', title: 'UPI Payments (UPI பயன்பாடு)', desc: 'UPI மூலம் பணம் செலுத்துவது எப்படி?' },
        { id: 'fDpoiQehVxc', title: 'ATM Activation (ATM செயல்படுத்துதல்)', desc: 'ATM கார்டு செயல்படுத்துவது எப்படி?' },
        { id: '9HD7_dGZeaw', title: 'Money Withdraw (பணம் எடுத்தல்)', desc: 'ATM-ல் பணம் எடுப்பது எப்படி?' },
        { id: 'C0lSJICDv6I', title: 'Money Deposit (பணம் செலுத்துதல்)', desc: 'வங்கி கணக்கில் பணம் செலுத்துவது.' },
        { id: 'z2RJJHhfRyo', title: 'EMI Basics (EMI அடிப்படை)', desc: 'EMI என்றால் என்ன?' },
        { id: 'DZZCbiX_Zxo', title: 'Insurance (காப்பீடு)', desc: 'காப்பீடு ஏன் அவசியம்?' },
        { id: 'Xd5j7PJMcF0', title: 'Bank Accounts (வங்கி கணக்குகள்)', desc: 'வங்கி கணக்கு வகைகள்.' },
        { id: 'tA3br_JPB-E', title: 'Account Opening (கணக்கு தொடங்குதல்)', desc: 'புதிய வங்கி கணக்கு தொடங்குவது.' },
        { id: 'dxpOqe4_zt4', title: 'Challan Filling (செலான் நிரப்புதல்)', desc: 'வங்கி செலான் நிரப்புவது எப்படி?' },
    ],
    // Hindi Videos Provided by User
    hi: [
        { id: '8WiDwcchrd8', title: 'Personal Loan (पर्सनल लोन)', desc: 'पर्सनल लोन की पूरी जानकारी।' },
        { id: 'OVoMUPw4ukg', title: 'Home Loan (होम लोन)', desc: 'होम लोन कैसे प्राप्त करें?' },
        { id: '0Lcyu2_IXxU', title: 'Vehicle Loan (वाहन लोन)', desc: 'कार और बाइक लोन गाइड।' },
        { id: 'a9C6o4jlnu4', title: 'Education Loan (एजुकेशन लोन)', desc: 'छात्रों के लिए एजुकेशन लोन।' },
        { id: 'RMlxi-5C7so', title: 'Gold Loan (गोल्ड लोन)', desc: 'गोल्ड लोन कैसे लें?' },
        { id: 'vA9-4B2KnqE', title: 'Post Office Schemes (पोस्ट ऑफिस)', desc: 'महत्वपूर्ण पोस्ट ऑफिस स्कीम्स।' },
        { id: '7uVPo6xG0Io', title: 'Money Saving (पैसे बचाएं)', desc: 'पैसे बचाने के आसान तरीके।' },
        { id: 'CnH9_n5L4Nc', title: 'UPI Guide (यूपीआई गाइड)', desc: 'यूपीआई का सही इस्तेमाल।' },
        { id: 'VHX4rg8ZF8o', title: 'ATM Activation (एटीएम एक्टिवेशन)', desc: 'नया एटीएम कार्ड चालू करें।' },
        { id: 'S1BnqNzLL8Y', title: 'Cash Withdraw (पैसे निकालना)', desc: 'एटीएम से पैसे कैसे निकालें।' },
        { id: '1aXiUXKnWeo', title: 'Cash Deposit (पैसे जमा करना)', desc: 'एटीएम मशीन से पैसे जमा करें।' },
        { id: 'ttWoN-2RlZo', title: 'EMI Basics (ईएमआई)', desc: 'ईएमआई कैलकुलेशन समझें।' },
        { id: 'z6XAZve99xY', title: 'Insurance (इंश्योरेंस)', desc: 'जीवन और स्वास्थ्य बीमा।' },
        { id: 'METIVJMPfC4', title: 'Account Opening (खाता खोलना)', desc: 'बैंक खाता कैसे खोलें।' },
        { id: 'WT8Gei4OHJc', title: 'Account Types (खातों के प्रकार)', desc: 'बचत और चालू खाते में अंतर।' },
        { id: 'fywWvaktGo8', title: 'Form Filling (फॉर्म भरना)', desc: 'बैंक फॉर्म सही तरीके से भरें।' },
    ],
    // Fallbacks or other languages can share 'en' or have their own
    // Malayalam Videos Provided by User
    ml: [
        { id: '4Snw_O0r7CE', title: 'Personal Loan (വ്യക്തിഗത വായ്പ)', desc: 'വ്യക്തിഗത വായ്പയെക്കുറിച്ചുള്ള വിവരങ്ങൾ.' },
        { id: '8DrE8PFeyrA', title: 'Home Loan (ഭവന വായ്പ)', desc: 'ഭവന വായ്പയെക്കുറിച്ചുള്ള പൂർണ്ണ വിവരങ്ങൾ.' },
        { id: 'ItsNec_y8lc', title: 'Vehicle Loan (വാഹന വായ്പ)', desc: 'വാഹന വായ്പ എങ്ങനെ നേടാം?' },
        { id: 'zuGxgof1Ycw', title: 'Education Loan (വിദ്യാഭ്യാസ വായ്പ)', desc: 'വിദ്യാർത്ഥികൾക്കുള്ള വിദ്യാഭ്യാസ വായ്പ.' },
        { id: 'vuCVdebXb_8', title: 'Gold Loan (സ്വർണ്ണ പണയം)', desc: 'സ്വർണ്ണ വായ്പയെക്കുറിച്ച് അറിയേണ്ടതെല്ലാം.' },
        { id: 'OMINEAGTTsA', title: 'Post Office Schemes (പോസ്റ്റ് ഓഫീസ്)', desc: 'പോസ്റ്റ് ഓഫീസ് സേവിംഗ്സ് സ്കീമുകൾ.' },
        { id: 'Gzbogfy01dE', title: 'Money Saving (പണം സമ്പാദിക്കാം)', desc: 'പണം ലാഭിക്കുന്നതിനുള്ള വഴികൾ.' },
        { id: 'lKsmwq7z6mA', title: 'UPI Guide (യുപിഐ)', desc: 'യുപിഐ എങ്ങനെ സുരക്ഷിതമായി ഉപയോഗിക്കാം.' },
        { id: 'b1q1sXVVTNI', title: 'ATM Card Activation (എടിഎം കാർഡ്)', desc: 'പുതിയ എടിഎം കാർഡ് ആക്ടിവേഷൻ.' },
        { id: 'fzTrVXDp1L4', title: 'Cash Withdrawal (പണം പിൻവലിക്കൽ)', desc: 'എടിഎമ്മിൽ നിന്ന് പണം പിൻവലിക്കുന്നത് എങ്ങനെ?' },
        { id: 'gwbStNdyyO0', title: 'Cash Deposit (പണം നിക്ഷേപിക്കൽ)', desc: 'എടിഎം വഴി പണം നിക്ഷേപിക്കുന്നത് എങ്ങനെ?' },
        { id: 'pS33LchQQOg', title: 'EMI Basics (ഇഎംഐ)', desc: 'ഇഎംഐ എന്താണെന്ന് മനസ്സിലാക്കാം.' },
        { id: 'Bt_BeL_FLPg', title: 'Insurance (ഇൻഷുറൻസ്)', desc: 'ഇൻഷുറൻസ് എന്തിനാണ്?' },
        { id: '8ufnX3L1gWk', title: 'Account Opening (അക്കൗണ്ട് ഓപ്പണിംഗ്)', desc: 'ബാങ്ക് അക്കൗണ്ട് എങ്ങനെ തുടങ്ങാം?' },
        { id: 'aaYTKLAVrso', title: 'Types of Accounts (അക്കൗണ്ട് തരങ്ങൾ)', desc: 'വിവിധ തരം ബാങ്ക് അക്കൗണ്ടുകൾ.' },
        { id: 'uhy6eeAurPg', title: 'Challan Filling (ചലാൻ പൂരിപ്പിക്കൽ)', desc: 'ബാങ്ക് ചലാൻ എങ്ങനെ പൂരിപ്പിക്കാം?' },
    ],
    // Telugu Videos Provided by User
    te: [
        { id: '_lGNwss4d6A', title: 'Personal Loan (వ్యక్తిగత రుణం)', desc: 'వ్యక్తిగత రుణం గురించి పూర్తి వివరాలు.' },
        { id: 'VGXyv_xaxj0', title: 'Home Loan (గృహ రుణం)', desc: 'గృహ రుణం ఎలా పొందాలి?' },
        { id: 'l4ST0wn6uUA', title: 'Vehicle Loan (వాహన రుణం)', desc: 'వాహన రుణం సమాచారం.' },
        { id: 'Xpbb7oVzStM', title: 'Education Loan (విద్యా రుణం)', desc: 'విద్యార్థుల కోసం విద్యా రుణం.' },
        { id: 'aKL1W1aAY-M', title: 'Gold Loan (బంగారు రుణం)', desc: 'బంగారు రుణం ఎలా తీసుకోవాలి?' },
        { id: 'XZ0sVGkH_tA', title: 'Post Office Schemes (పోస్ట్ ఆఫీస్)', desc: 'పోస్ట్ ఆఫీస్ పొదుపు పథకాలు.' },
        { id: 'DkD4RW-by8U', title: 'Money Saving (డబ్బు ఆదా)', desc: 'డబ్బు ఆదా చేసే పద్ధతులు.' },
        { id: 'Oh_63DpYJtY', title: 'UPI Guide (UPI విధానం)', desc: 'UPI ని సురక్షితంగా ఎలా వాడాలి?' },
        { id: '9DaFJ_PS8VM', title: 'ATM Card Activation (ATM కార్డు)', desc: 'కొత్త ATM కార్డు యాక్టివేషన్.' },
        { id: 'zhqWjtr5tNY', title: 'Cash Withdrawal (డబ్బు విత్ డ్రా)', desc: 'ATM నుండి డబ్బు ఎలా తీయాలి?' },
        { id: 'x9nLF3hYVSA', title: 'Cash Deposit (డబ్బు జమ)', desc: 'ATM/CDM ద్వారా డబ్బు జమ చేయడం.' },
        { id: 'yxlz1bcp1kE', title: 'EMI Basics (EMI అంటే ఏమిటి)', desc: 'EMI గురించి పూర్తి అవగాహన.' },
        { id: 'UZzZ_B-2SaA', title: 'Insurance (బీమా)', desc: 'బీమా యొక్క ప్రాముఖ్యత.' },
        { id: 'LXqC53WDKcA', title: 'Account Opening (ఖాతా తెరవడం)', desc: 'బ్యాంకు ఖాతా ఎలా తెరవాలి?' },
        { id: 'yyWKIEo8w88', title: 'Types of Accounts (ఖాతా రకాలు)', desc: 'పొదుపు మరియు కరెంట్ ఖాతాలు.' },
        { id: 'aaYTKLAVrso', title: 'Challan Filling (చలాన్ నింపడం)', desc: 'బ్యాంకు చలాన్ ఎలా నింపాలి?' },
    ]
};
const Tutorials = () => {
    const { t, i18n } = useTranslation();
    const [activeVideo, setActiveVideo] = useState(null);
    // Default to English if language not found, or 'ta' if explicit map exists
    // For now, if 'hi', 'ml', 'te' are empty, we might want to show English or Tamil?
    // Let's fallback to English for now.
    // Select videos based on language. Fallback to English if specific language list is empty or missing.
    const currentVideos = videoLists[i18n.language]?.length > 0 ? videoLists[i18n.language] : videoLists['en'];
    return (_jsx("section", { id: "tutorials", className: "py-16 bg-transparent", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: t('navbar.tutorials') }), _jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-300", children: "Short, simple videos to help you master your money." })] }), activeVideo && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4", onClick: () => setActiveVideo(null), children: _jsx("div", { className: "relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl", children: _jsx("iframe", { src: `https://www.youtube.com/embed/${activeVideo}?autoplay=1`, title: "YouTube video player", className: "w-full h-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }) })), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: currentVideos.map((video) => (_jsxs("div", { onClick: () => setActiveVideo(video.id), className: "group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1", children: [_jsxs("div", { className: "relative aspect-video bg-gray-200 dark:bg-slate-700", children: [_jsx("img", { src: `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`, alt: video.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all", children: _jsx("div", { className: "w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md scale-90 group-hover:scale-110 transition-transform", children: _jsx(Play, { className: "w-5 h-5 text-brand-blue", fill: "currentColor" }) }) })] }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-bold text-gray-900 dark:text-white mb-1 line-clamp-1", title: video.title, children: video.title }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 line-clamp-2", children: video.desc })] })] }, video.id))) })] }) }));
};
export default Tutorials;
