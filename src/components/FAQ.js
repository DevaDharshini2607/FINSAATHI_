import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const { t } = useTranslation();
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const faqs = t('faq_items', { returnObjects: true });
    // Fallback if translation fails or returns string
    const currentFaqs = Array.isArray(faqs) ? faqs : [];
    return (_jsx("section", { id: "faq", className: "py-16 bg-transparent", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-4", children: t('navbar.faq') }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 max-w-2xl mx-auto", children: "Common questions about financial safety and growth." })] }), _jsx("div", { className: "max-w-3xl mx-auto space-y-4", children: currentFaqs.map((faq, index) => (_jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden text-left", children: [_jsxs("button", { onClick: () => toggleFAQ(index), className: "w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors", children: [_jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: faq.question }), openIndex === index ? (_jsx(Minus, { className: "w-5 h-5 text-brand-blue flex-shrink-0" })) : (_jsx(Plus, { className: "w-5 h-5 text-gray-400 flex-shrink-0" }))] }), _jsx("div", { className: `px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`, children: _jsx("p", { className: "text-gray-600 dark:text-gray-300", children: faq.answer }) })] }, index))) })] }) }));
};
export default FAQ;
