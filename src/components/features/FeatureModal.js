import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
const FeatureModal = ({ isOpen, onClose, title, children, icon: Icon, color }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200", children: _jsxs("div", { className: "relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100", children: [_jsxs("div", { className: clsx("p-4 flex items-center justify-between text-white shadow-md", color || 'bg-brand-blue'), children: [_jsxs("div", { className: "flex items-center space-x-3", children: [Icon && _jsx("div", { className: "p-2 bg-white/20 rounded-xl backdrop-blur-md", children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsx("h3", { className: "text-xl font-bold tracking-wide", children: title })] }), _jsx("button", { onClick: onClose, className: "p-1.5 hover:bg-white/20 rounded-full transition-colors active:scale-95", "aria-label": "Close", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "p-6 max-h-[80vh] overflow-y-auto dark:text-gray-200", children: children })] }) }));
};
export default FeatureModal;
