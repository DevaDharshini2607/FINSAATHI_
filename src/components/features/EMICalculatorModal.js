import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import FeatureModal from './FeatureModal';
const InputField = ({ label, name, placeholder, icon, value, onChange }) => (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider", children: label }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs", children: icon }), _jsx("input", { type: "number", name: name, value: value, onChange: onChange, placeholder: placeholder, className: "w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium" })] })] }));
const EMICalculatorModal = ({ isOpen, onClose }) => {
    const [values, setValues] = useState({
        P: '',
        rate: '',
        N: ''
    });
    const [E, setE] = useState(null);
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setE(null);
    };
    const calculateEMI = () => {
        const P = parseFloat(values.P);
        const annualRate = parseFloat(values.rate);
        const N = parseFloat(values.N);
        if (!P || !annualRate || !N)
            return;
        const R = annualRate / 12 / 100; // Monthly interest rate
        // Formula: E = [P x R x (1+R)^N] / [(1+R)^N - 1]
        const num = P * R * Math.pow(1 + R, N);
        const den = Math.pow(1 + R, N) - 1;
        const calculatedEMI = num / den;
        setE(calculatedEMI);
    };
    return (_jsx(FeatureModal, { isOpen: isOpen, onClose: onClose, title: "EMI Calculator", icon: Calculator, color: "bg-blue-500", children: _jsxs("div", { className: "space-y-5", children: [_jsx(InputField, { label: "Loan Amount (P)", name: "P", placeholder: "500000", icon: "\u20B9", value: values.P, onChange: handleChange }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(InputField, { label: "Interest Rate (Annual)", name: "rate", placeholder: "10.5", icon: "%", value: values.rate, onChange: handleChange }), _jsx(InputField, { label: "Tenure (Months) (N)", name: "N", placeholder: "60", icon: "Mo", value: values.N, onChange: handleChange })] }), _jsx("button", { onClick: calculateEMI, className: "w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 active:scale-95 transition-all", children: "Calculate EMI" }), E !== null && (_jsxs("div", { className: "bg-blue-50 rounded-xl p-5 text-center border border-blue-100 animate-in fade-in slide-in-from-bottom-2", children: [_jsx("p", { className: "text-sm text-blue-600 font-medium mb-1", children: "Your Monthly EMI (E)" }), _jsxs("div", { className: "text-3xl font-extrabold text-blue-700", children: ["\u20B9", Math.round(E).toLocaleString('en-IN')] }), _jsxs("div", { className: "mt-3 pt-3 border-t border-blue-100 grid grid-cols-2 gap-2 text-xs text-gray-500", children: [_jsxs("div", { children: [_jsx("span", { className: "block", children: "Total Payment" }), _jsxs("span", { className: "font-semibold text-blue-800", children: ["\u20B9", Math.round(E * parseFloat(values.N)).toLocaleString('en-IN')] })] }), _jsxs("div", { children: [_jsx("span", { className: "block", children: "Total Interest" }), _jsxs("span", { className: "font-semibold text-blue-800", children: ["\u20B9", Math.round((E * parseFloat(values.N)) - parseFloat(values.P)).toLocaleString('en-IN')] })] })] })] }))] }) }));
};
export default EMICalculatorModal;
