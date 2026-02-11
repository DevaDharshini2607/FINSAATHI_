import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { X, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const TollFreeModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center p-6 relative", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("div", { className: "w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4", children: _jsx(PhoneCall, { className: "w-8 h-8 text-green-600 dark:text-green-400" }) }), _jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-2 text-center", children: t('tollfree_modal.title') }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 text-center mb-6", children: t('tollfree_modal.desc') }), _jsxs("div", { className: "bg-gray-50 dark:bg-slate-800 rounded-xl px-6 py-4 border border-gray-200 dark:border-gray-700 w-full text-center", children: [_jsx("p", { className: "text-sm text-gray-500 uppercase font-semibold mb-1", children: t('tollfree_modal.call_us') }), _jsx("p", { className: "text-2xl font-mono font-bold text-brand-blue tracking-wider", children: "xxxxx xxxxx" })] }), _jsx("button", { onClick: onClose, className: "mt-6 w-full bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors", children: t('tollfree_modal.close') })] }) }));
};
export default TollFreeModal;
