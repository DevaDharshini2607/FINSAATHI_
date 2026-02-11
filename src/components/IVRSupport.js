import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
import { PhoneCall, Headphones } from 'lucide-react';
const IVRSupport = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);
    return (_jsx("section", { ref: sectionRef, className: "w-full py-12 px-4 flex justify-center items-center", children: _jsxs("div", { className: `
                    w-full max-w-4xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/50 
                    border border-purple-100 dark:border-slate-700
                    rounded-3xl shadow-xl shadow-purple-500/5 p-8 md:p-12 text-center 
                    transform transition-all duration-1000 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `, children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "bg-white dark:bg-slate-700 p-4 rounded-full shadow-md animate-bounce-slow", children: _jsx(Headphones, { className: "w-10 h-10 text-brand-blue" }) }) }), _jsx("h2", { className: "text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-6 drop-shadow-sm", children: "IVR Financial Voice Support" }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8", children: "Call our financial awareness helpline to learn about savings, government schemes, loans, and fraud protection. Works on both smartphones and keypad phones. Available in multiple languages." }), _jsx("div", { className: "flex justify-center", children: _jsxs("a", { href: "tel:1800-123-4567", className: "\r\n                            group flex items-center space-x-3 \r\n                            bg-brand-blue hover:bg-indigo-600 text-white \r\n                            px-8 py-4 rounded-full font-bold text-lg \r\n                            shadow-lg shadow-blue-500/30 hover:shadow-indigo-500/40\r\n                            transition-all duration-300 transform hover:scale-105\r\n                        ", children: [_jsx(PhoneCall, { className: "w-5 h-5 group-hover:rotate-12 transition-transform" }), _jsx("span", { children: "Call Now" })] }) })] }) }));
};
export default IVRSupport;
