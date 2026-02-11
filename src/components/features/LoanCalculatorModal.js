import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Landmark, Briefcase, Car, GraduationCap, ArrowLeft, Trophy, ArrowDownUp, CheckCircle2 } from 'lucide-react';
import FeatureModal from './FeatureModal';
const LOAN_DATA = {
    home: [
        { bank: 'Bank of India', rate: '7.10% onwards', minRate: 7.10 },
        { bank: 'Canara Bank', rate: '7.15% onwards', minRate: 7.15 },
        { bank: 'Bank of Baroda', rate: '7.45% - 10.20%', minRate: 7.45 },
        { bank: 'Union Bank of India', rate: '7.45% - 12.65%', minRate: 7.45 },
        { bank: 'SBI', rate: '7.50% - 10.50%', minRate: 7.50 },
        { bank: 'HDFC Bank', rate: '7.90% - 13.20%', minRate: 7.90 },
        { bank: 'Axis Bank', rate: '8.35% - 11.90%', minRate: 8.35 },
        { bank: 'ICICI Bank', rate: '8.75% - 11.80%', minRate: 8.75 },
    ],
    personal: [
        { bank: 'Canara Bank', rate: '9.70% - 15.15%', minRate: 9.70 },
        { bank: 'Indian Bank', rate: '9.75% - 15.25%', minRate: 9.75 },
        { bank: 'Axis Bank', rate: '9.99% onwards', minRate: 9.99 },
        { bank: 'HDFC Bank', rate: '9.99% - 24.00%', minRate: 9.99 },
        { bank: 'SBI', rate: '10.10% - 15.10%', minRate: 10.10 },
        { bank: 'Bank of Baroda', rate: '10.15% - 18.05%', minRate: 10.15 },
        { bank: 'ICICI Bank', rate: '10.45% - 16.65%', minRate: 10.45 },
    ],
    auto: [
        { bank: 'Bank of Baroda', rate: '7.45% onwards', minRate: 7.45 },
        { bank: 'Canara Bank', rate: '7.45% onwards', minRate: 7.45 },
        { bank: 'Punjab National Bank', rate: '7.55% - 9.40%', minRate: 7.55 },
        { bank: 'SBI', rate: '8.70% - 15.70%', minRate: 8.70 },
        { bank: 'Axis Bank', rate: '8.80% - 11.80%', minRate: 8.80 },
        { bank: 'HDFC Bank', rate: '9.00% onwards', minRate: 9.00 },
        { bank: 'ICICI Bank', rate: '9.15% onwards', minRate: 9.15 },
    ],
    education: [
        { bank: 'SBI', rate: '6.90% - 10.15%', minRate: 6.90 },
        { bank: 'Canara Bank', rate: '9.80% - 12.00%', minRate: 9.80 },
        { bank: 'HDFC/ICICI/Axis', rate: '10.00% - 15.00% (Typical)', minRate: 10.00 },
    ]
};
const LoanCalculatorModal = ({ isOpen, onClose }) => {
    const [selectedType, setSelectedType] = useState(null);
    const handleSelect = (type) => {
        setSelectedType(type);
    };
    const handleBack = () => {
        setSelectedType(null);
    };
    const getSortedBanks = (type) => {
        return [...LOAN_DATA[type]].sort((a, b) => a.minRate - b.minRate);
    };
    const renderLoanSelection = () => (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("button", { onClick: () => handleSelect('home'), className: "flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 bg-blue-50 hover:bg-blue-100 hover:border-blue-200 transition-all group", children: [_jsx("div", { className: "bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform", children: _jsx(Landmark, { className: "w-8 h-8 text-blue-600" }) }), _jsx("span", { className: "font-bold text-gray-800", children: "Home Loan" })] }), _jsxs("button", { onClick: () => handleSelect('personal'), className: "flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 bg-purple-50 hover:bg-purple-100 hover:border-purple-200 transition-all group", children: [_jsx("div", { className: "bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform", children: _jsx(Briefcase, { className: "w-8 h-8 text-purple-600" }) }), _jsx("span", { className: "font-bold text-gray-800", children: "Personal Loan" })] }), _jsxs("button", { onClick: () => handleSelect('auto'), className: "flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 bg-orange-50 hover:bg-orange-100 hover:border-orange-200 transition-all group", children: [_jsx("div", { className: "bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform", children: _jsx(Car, { className: "w-8 h-8 text-orange-600" }) }), _jsx("span", { className: "font-bold text-gray-800", children: "Car/Auto Loan" })] }), _jsxs("button", { onClick: () => handleSelect('education'), className: "flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-200 transition-all group", children: [_jsx("div", { className: "bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform", children: _jsx(GraduationCap, { className: "w-8 h-8 text-emerald-600" }) }), _jsx("span", { className: "font-bold text-gray-800", children: "Education Loan" })] })] }));
    const renderComparison = () => {
        if (!selectedType)
            return null;
        const banks = getSortedBanks(selectedType);
        const titleMap = {
            home: 'Home Loan Rates',
            personal: 'Personal Loan Rates',
            auto: 'Car Loan Rates',
            education: 'Education Loan Rates'
        };
        return (_jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("button", { onClick: handleBack, className: "mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("h3", { className: "text-lg font-bold text-gray-800", children: titleMap[selectedType] }), _jsxs("div", { className: "ml-auto flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full", children: [_jsx(ArrowDownUp, { className: "w-3 h-3 mr-1" }), "Low to High"] })] }), _jsx("div", { className: "space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: banks.map((bank, index) => (_jsxs("div", { className: `relative flex justify-between items-center p-4 rounded-xl border ${index === 0 ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-100' : 'bg-white border-gray-100 hover:border-gray-200'} transition-all`, children: [index === 0 && (_jsxs("div", { className: "absolute -top-3 left-4 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center border border-orange-200 shadow-sm", children: [_jsx(Trophy, { className: "w-3 h-3 mr-1" }), " Best Option"] })), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs ${index === 0 ? 'bg-orange-500' : 'bg-gray-400'}`, children: bank.bank.charAt(0) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-gray-800 text-sm", children: bank.bank }), index === 0 && _jsxs("span", { className: "text-[10px] text-green-600 flex items-center", children: [_jsx(CheckCircle2, { className: "w-3 h-3 mr-0.5" }), " Lowest Rate"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: `font-bold text-base ${index === 0 ? 'text-orange-600' : 'text-gray-900'}`, children: bank.rate }), _jsx("p", { className: "text-[10px] text-gray-400", children: "Interest Rate" })] })] }, index))) })] }));
    };
    return (_jsx(FeatureModal, { isOpen: isOpen, onClose: onClose, title: "Loan Comparator", icon: Landmark, color: "bg-orange-500", children: _jsx("div", { className: "space-y-4", children: !selectedType ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-sm text-gray-500 text-center mb-2", children: "Select a loan type to compare bank rates" }), renderLoanSelection()] })) : (renderComparison()) }) }));
};
export default LoanCalculatorModal;
