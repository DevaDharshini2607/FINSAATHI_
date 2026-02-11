import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { clsx } from 'clsx';
const languages = [
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'en', name: 'English' },
];
const LanguageBar = ({ currentLang, setLang }) => {
    return (_jsx("div", { className: "bg-teal border-b border-gray-200 py-3 sticky top-16 z-40 shadow-sm", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-start sm:justify-center overflow-x-auto space-x-4 scrollbar-hide py-1", children: [_jsx("span", { className: "text-sm font-semibold text-gray-500 whitespace-nowrap sr-only sm:not-sr-only", children: "Choose Language:" }), languages.map((lang) => (_jsx("button", { onClick: () => setLang(lang.name), className: clsx("px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border", currentLang === lang.name
                            ? "bg-brand-blue text-white border-brand-blue shadow-md scale-105"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-brand-light-blue hover:text-brand-blue hover:border-brand-light-blue"), children: lang.name }, lang.code)))] }) }) }));
};
export default LanguageBar;
