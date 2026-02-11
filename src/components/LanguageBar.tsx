import React from 'react';
import { clsx } from 'clsx';

interface LanguageBarProps {
    currentLang: string;
    setLang: (lang: string) => void;
}

const languages = [
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'en', name: 'English' },
];

const LanguageBar: React.FC<LanguageBarProps> = ({ currentLang, setLang }) => {
    return (
        <div className="bg-teal border-b border-gray-200 py-3 sticky top-16 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-start sm:justify-center overflow-x-auto space-x-4 scrollbar-hide py-1">
                    <span className="text-sm font-semibold text-gray-500 whitespace-nowrap sr-only sm:not-sr-only">Choose Language:</span>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setLang(lang.name)}
                            className={clsx(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border",
                                currentLang === lang.name
                                    ? "bg-brand-blue text-white border-brand-blue shadow-md scale-105"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-brand-light-blue hover:text-brand-blue hover:border-brand-light-blue"
                            )}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageBar;
