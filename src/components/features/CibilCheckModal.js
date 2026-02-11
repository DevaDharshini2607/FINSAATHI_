import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Smartphone, RotateCcw } from 'lucide-react';
import FeatureModal from './FeatureModal';
import { clsx } from 'clsx';
const CibilCheckModal = ({ isOpen, onClose }) => {
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const checkScore = () => {
        setLoading(true);
        setScore(null);
        // Simulate API delay
        setTimeout(() => {
            // Random score between 600 and 850
            const randomScore = Math.floor(Math.random() * (850 - 600 + 1)) + 600;
            setScore(randomScore);
            setLoading(false);
        }, 1500);
    };
    const getRating = (s) => {
        if (s >= 750)
            return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
        if (s >= 700)
            return { label: 'Good', color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' };
        if (s >= 650)
            return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
        return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
    };
    return (_jsx(FeatureModal, { isOpen: isOpen, onClose: onClose, title: "CIBIL Score Check", icon: Smartphone, color: "bg-purple-500", children: _jsxs("div", { className: "space-y-6 text-center", children: [!score && !loading && (_jsxs("div", { className: "py-8", children: [_jsx("p", { className: "text-gray-600 mb-6", children: "Check your credit score instantly without any paperwork." }), _jsx("button", { onClick: checkScore, className: "px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-lg shadow-purple-200 active:scale-95 transition-all text-lg", children: "Check My Score" })] })), loading && (_jsxs("div", { className: "py-10 flex flex-col items-center justify-center space-y-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" }), _jsx("p", { className: "text-gray-500 font-medium animate-pulse", children: "Analyzing credit history..." })] })), score && (_jsxs("div", { className: "animate-in zoom-in-50 duration-300", children: [_jsx("div", { className: "relative inline-flex items-center justify-center", children: _jsxs("div", { className: "w-48 h-24 overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-gray-100" }), _jsx("div", { className: clsx("absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-l-transparent border-b-transparent transition-all duration-1000 ease-out", getRating(score).color.replace('text', 'border')), style: { transform: `rotate(${((score - 300) / 600) * 180 - 45}deg)` } })] }) }), _jsxs("div", { className: clsx("mt-4 p-4 rounded-2xl border", getRating(score).bg, getRating(score).border), children: [_jsx("div", { className: "text-5xl font-black mb-1 text-gray-800", children: score }), _jsx("div", { className: clsx("text-xl font-bold uppercase tracking-widest", getRating(score).color), children: getRating(score).label })] }), _jsx("div", { className: "mt-6 flex justify-center", children: _jsxs("button", { onClick: checkScore, className: "flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-600 transition-colors", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), _jsx("span", { children: "Check Again" })] }) })] })), _jsx("div", { className: "text-xs text-gray-400 mt-4 border-t pt-4", children: "* This is a simulated score for demonstration purposes only." })] }) }));
};
export default CibilCheckModal;
