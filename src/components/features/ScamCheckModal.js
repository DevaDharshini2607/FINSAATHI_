import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import FeatureModal from './FeatureModal';
const ScamCheckModal = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const checkScam = () => {
        if (!message.trim())
            return;
        const scamKeywords = ["lottery", "winner", "free money", "otp", "urgent", "bank link", "click here", "prize", "account blocked"];
        const lowerMsg = message.toLowerCase();
        const isScam = scamKeywords.some(keyword => lowerMsg.includes(keyword));
        setResult(isScam ? 'scam' : 'safe');
    };
    const reset = () => {
        setMessage('');
        setResult(null);
    };
    return (_jsx(FeatureModal, { isOpen: isOpen, onClose: onClose, title: "Scam Detector", icon: ShieldAlert, color: "bg-red-500", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Check Message Safety" }), _jsx("textarea", { value: message, onChange: (e) => {
                                setMessage(e.target.value);
                                if (result)
                                    setResult(null); // Reset result on edit
                            }, placeholder: "Paste the suspicious message here (e.g. You won a lottery, click this link...)", className: "w-full h-32 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none resize-none text-sm transition-all" })] }), !result && (_jsx("button", { onClick: checkScam, disabled: !message.trim(), className: "w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed", children: "Analyze Message" })), result === 'scam' && (_jsxs("div", { className: "bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2", children: [_jsx("div", { className: "w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2", children: _jsx(AlertTriangle, { className: "w-6 h-6" }) }), _jsx("h4", { className: "text-lg font-bold text-red-700", children: "\u26A0\uFE0F Possible Scam!" }), _jsx("p", { className: "text-sm text-red-600 mt-1", children: "This message contains keywords often used in financial fraud." }), _jsx("button", { onClick: reset, className: "mt-4 text-sm font-semibold text-red-600 underline", children: "Check another" })] })), result === 'safe' && (_jsxs("div", { className: "bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2", children: [_jsx("div", { className: "w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2", children: _jsx(CheckCircle, { className: "w-6 h-6" }) }), _jsx("h4", { className: "text-lg font-bold text-emerald-700", children: "Likely Safe" }), _jsx("p", { className: "text-sm text-emerald-600 mt-1", children: "No common scam triggers were found, but always stay vigilant." }), _jsx("button", { onClick: reset, className: "mt-4 text-sm font-semibold text-emerald-600 underline", children: "Check another" })] }))] }) }));
};
export default ScamCheckModal;
